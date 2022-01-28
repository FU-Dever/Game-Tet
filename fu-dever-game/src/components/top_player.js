import React from "react";
import Player from "./player";

<<<<<<< Updated upstream
const players = [
    {
        "avt" : "./assets/images/avt.jpg",
        "name" : "Bach Doan Vuong",
        "score" : "10000"
    },
    {
        "avt" : "./assets/images/avt.jpg",
        "name" : "Vuong Dep Trai",
        "score" : "9000"
    },
    {
        "avt" : "./assets/images/avt.jpg",
        "name" : "Ngay Mai Cuoi Vo",
        "score" : "6900"
    }
]


export default class TopPlayer extends React.Component{
    render(){
        return(
            <div id="wrap-top-player">
                <h2 id="top-player-title">Top Rank</h2>
                {
                    players.map(
                        (player, index)=> <Player key={index} avt={player.avt} name={player.name} score={player.score}/>
                    )
                }
            </div>
        );
    }
}
=======
export default function TopPlayer() {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    const usersList = ref(db, "users/");
    onValue(usersList, (snapshot) => {
      const data = snapshot.val();
      setPlayers(Object.entries(data));
    });
  }, []);
  players !== [] &&
    players.sort(function (player1, player2) {
      return player1[1].money < player2[1].money;
    });
  return (
    <div id="wrap-top-player">
      <h2 id="top-player-title">Top Rank</h2>
      <h3>Total Users: {players.length}</h3>
      {players !== [] &&
        players.map((player) => (
          <Player name={player[0]} score={player[1].money} />
        ))}
    </div>
  );
}
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
//
>>>>>>> Stashed changes
