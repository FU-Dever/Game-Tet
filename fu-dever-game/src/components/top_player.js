import React from "react";
import Player from "./player";

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