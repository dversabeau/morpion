import "./MainLayout.css";
import { useEffect, useState } from "react";
import { socket } from "../service/socket";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";

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

  const [playerCreated, setPlayerCreated] = useState(false);

  const connectRoom = () => {
    socket.emit("playerData", player);
    setPlayerCreated(true)
  };

  return (
    <div className="main-body">
      <Card className={`${playerCreated === false ? "display" : "d-none"}`} >
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
                console.log("connect");
                connectRoom();
              }}
            >
              Créer un salon privée
            </Button>
          </InputGroup>
        </Card.Body>
      </Card>
      <Card className={`${playerCreated === true ? "display" : "d-none"}`}>
        <Card.Header>En attente d'un autre joueur...</Card.Header>
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
    </div>
  );
};

export default MainLayout;
