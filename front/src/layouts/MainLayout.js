import "./MainLayout.css";
import { useEffect, useState } from "react";
import { socket } from "../service/socket";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";
import Playground from "../components/Playground";

const MainLayout = () => {
  const [player, setPlayer] = useState({
    host: false,
    playedCell: "",
    roomId: null,
    username: "",
    socketId: "",
    symbol: "X",
    turn: false,
    win: false,
  });

  let [list, setList] = useState([]);
  const [playerCreated, setPlayerCreated] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const getList = () => {
    socket.emit("get rooms");
    socket.on("list rooms", (rooms) => {
      if (rooms.length > 0) {
        rooms.map((room) => {
          if (room.players.length < 2) {
            setList((list) => [...list, room]);
          }
        });
      }
    });
  };

  socket.on("start game", () => {
    setGameStarted(true);
    console.log('gameStarted', gameStarted)
  });

  useEffect(() => {
    getList();
  }, []);

  const connectRoom = () => {
    socket.emit("playerData", player);
    setPlayerCreated(true);
    getList();
    console.log("connectedRoom list", list);
  };

  return (
    <div className="main-body">
      <Card className={`${playerCreated === false ? "display" : "d-none"}`}>
        <Card.Body>
          <h3>Créer un salon</h3>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Pseudo..."
              aria-label="Player name"
              aria-describedby="basic-addon1"
              onChange={(e) => setPlayer({ username: e.target.value })}
              onKeyUp={(e) => {
                e.key === "Enter" ? connectRoom() : e.preventDefault();
              }}
            />
            <Button
              variant="secondary"
              id="button-addon1"
              onClick={() => {
                connectRoom();
              }}
            >
              Créer un salon privée
            </Button>
          </InputGroup>
        </Card.Body>
      </Card>
      <Card className={`${playerCreated === true ? "display" : "d-none"}`}>
        <Card.Header>En attente d'un autre joueur</Card.Header>
        <Card.Body>
          <Spinner animation="border" role="status"></Spinner>
        </Card.Body>
      </Card>
      <Card className={`${playerCreated === true ? "display" : "d-none"}`}>
        <Card.Body>
          <Card.Text>
            Partage ce lien pour inviter quelqu'un à jouer avec toi
          </Card.Text>
          <Card.Link>Lien temporaire</Card.Link>
        </Card.Body>
      </Card>
      {list.length > 0 && list[0].players[0].username !== player.username && (
        <Card>
          <Card.Header>Salon disponibles</Card.Header>
          <Card.Body className="flex-column center">
            {list.map((item) => {
              if (item.players[0].username !== player.username) {
                return (
                  <Card key={item.id} className="width-100 card-room-link">
                    <Card.Body className="room-link">
                      <Card.Text>
                        {item.players[0].username} - {item.id}
                      </Card.Text>
                      <Button
                        variant="success"
                        onClick={(e) =>
                          socket.emit("join room", { player, item })
                        }
                      >
                        Rejoindre
                      </Button>
                    </Card.Body>
                  </Card>
                );
              }
            })}
          </Card.Body>
        </Card>
      )}
      <Playground gameStarted={gameStarted}></Playground>
    </div>
  );
};

export default MainLayout;
