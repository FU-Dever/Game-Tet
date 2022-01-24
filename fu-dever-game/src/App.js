import React from "react";
import { getDatabase, ref, set, push, child, update } from "firebase/database";
import { db } from "../src/firebase/setup";
import BingoPopUp from "./components/bingo_pop_up";
import Button from "./components/button";
import CountDown from "./components/count_down";
import Options from "./components/options";
import TopPlayer from "./components/top_player";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionIndex: [],
      isCountDown: false,
      popUpOpen: false,
      uid: "",
    };
  }

  btnAction(btn) {
    if (btn === "start") {
      let optionIndex1 = Math.floor(Math.random() * 5);
      let optionIndex2 = Math.floor(Math.random() * 5);
      let optionIndex3 = Math.floor(Math.random() * 5);

      let optionIndex = [optionIndex1, optionIndex2, optionIndex3];
      // alert(optionIndex)

      this.setState({
        optionIndex: optionIndex,
        popUpOpen: true,
      });
      const newPostKey = push(child(ref(db), "posts")).key;
      const updates = {};
      updates["sessions/" + this.state.uid + "/results"] = optionIndex;
      update(ref(db), updates);
    } else if (btn === "createCode") {
      let uid = "";
      for (let i = 1; i <= 11; i++)
        uid +=
          i % 4 === 0
            ? "-"
            : String.fromCharCode(Math.floor(Math.random() * 26 + 1) + 96);
      this.setState({
        uid: uid,
      });
      let today = new Date();
      let date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let dateTime = date + " " + time;
      set(ref(db, "sessions/" + uid), {
        uid: uid,
        isOpenning: false,
        timeCreate: dateTime,
      });
    } else {
      this.setState({
        isCountDown: true,
      });
      const updates = {};
      updates["sessions/" + this.state.uid + "/isOpenning"] = true;
      update(ref(db), updates);
    }
  }

  stopCountDown() {
    this.setState({
      isCountDown: false,
    });
    const updates = {};
    updates["sessions/" + this.state.uid + "/isOpenning"] = false;
    update(ref(db), updates);
  }

  popUpClose() {
    this.setState({
      popUpOpen: false,
    });
  }

  render() {
    return (
      <div className=".App">
        <div id="title-app">FU-DEVER BẦU CUA</div>
        {this.state.uid}
        <div id="wrap-content">
          <TopPlayer uid={this.state.uid}/>
          <Options />
          {this.state.isCountDown && (
            <CountDown stopCountDown={() => this.stopCountDown()} />
          )}
        </div>

        <div id="wrap-btns">
          <Button name="Ván mới" clicked={() => this.btnAction("createCode")} />
          <Button
            name="BẮT ĐẦU ĐẶT CƯỢC"
            clicked={() => this.btnAction("countDown")}
          />
          <Button name="XỔ" clicked={() => this.btnAction("start")} />
        </div>

        {this.state.popUpOpen && (
          <BingoPopUp
            close={() => this.popUpClose()}
            data={this.state.optionIndex}
          />
        )}
      </div>
    );
  }
}
