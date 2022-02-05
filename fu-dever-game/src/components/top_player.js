import { useState, useEffect } from "react";
import Player from "./player";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase/setup";

export default function TopPlayer() {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    const usersList = ref(db, "users/");
    onValue(usersList, (snapshot) => {
      const data = snapshot.val();
      setPlayers(Object.entries(data));
    });
  }, []);
  console.log(players)
  players !== [] &&
    players.sort(function (player1, player2) {
      return player1[1].money <= player2[1].money;
    });
  return (
    <div id="wrap-top-player">
      <h2 id="top-player-title">Top Rank</h2>
      {players !== [] &&
        players.map((player) => (
          <Player name={player[0]} score={player[1].money} />
        ))}
    </div>
  );
}
