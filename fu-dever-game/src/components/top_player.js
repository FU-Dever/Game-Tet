import { useState, useEffect } from "react";
import Player from "./player";
import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "../firebase/setup";
const players = [
  {
    avt: "./assets/images/avt.jpg",
    name: "Bach Doan Vuong",
    score: "10000",
  },
  {
    avt: "./assets/images/avt.jpg",
    name: "Vuong Dep Trai",
    score: "9000",
  },
  {
    avt: "./assets/images/avt.jpg",
    name: "Ngay Mai Cuoi Vo",
    score: "6900",
  },
];

export default function TopPlayer({ uid }) {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
      console.log(uid)
    const usersList = ref(db, "users/");
    onValue(usersList, (snapshot) => {
      const data = snapshot.val();
      console.log(Object.entries(data));
      setPlayers(Object.entries(data))
    });
  }, []);
  players!==[]&&players.sort(function (player1,player2){
      return player1[1].money<player2[1].money
  })
  return (
    <div id="wrap-top-player">
      <h2 id="top-player-title">Top Rank {uid}</h2>
      {
        // players.map(
        //     (player, index)=> <Player key={index} avt={player.avt} name={player.name} score={player.score}/>
        // )
        (players!==[])&&players.map((player)=><Player name={player[0]} score={player[1].money}/>)
      }
    </div>
  );
}
