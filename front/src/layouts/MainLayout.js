import "./MainLayout.css";
import { useEffect, useState } from "react";
import { socket } from "../service/socket";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

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

  const connectRoom = () => {
    console.log("player username", player.username);
    socket.emit("connection", player);
  };

  const handleUsername = () => {};

  return (
    <div className="main-body">
      <Card>
        <Card.Body>
          <h3>Créer un salon</h3>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Pseudo..."
              aria-label="Player name"
              aria-describedby="basic-addon1"
              onChange={(e) => player.username = e.target.value}
            />
            <Button
              variant="outline-secondary"
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
    </div>
  );
};

export default MainLayout;
