import React from "react";
import BingoPopUp from "./components/bingo_pop_up";
import Button from "./components/button";
import CountDown from "./components/count_down";
import Options from "./components/options";
import TopPlayer from "./components/top_player";
import Tet from "./Audio/Tet.mp3";
import { Howl, Howler } from "howler";
const Audio = [{ sound: Tet, label: "" }];
export default class App extends React.Component {
  SoundPlay = (src) => {
    const sound = new Howl({
      src,
    });
    sound.play();
  };
  constructor(props) {
    super(props);
    this.state = {
      optionIndex: [],
      isCountDown: false,
      popUpOpen: false,
    };
  }

  btnAction(btn) {
    if (btn === "start") {
      let optionIndex1 = Math.floor(Math.random() * 5);
      let optionIndex2 = Math.floor(Math.random() * 5);
      let optionIndex3 = Math.floor(Math.random() * 5);
      let optionIndex = [optionIndex1, optionIndex2, optionIndex3];
      alert(optionIndex);

      this.setState({
        optionIndex: optionIndex,
        popUpOpen: true,
      });
    } else {
      this.setState({
        isCountDown: true,
      });
    }
  }

  stopCountDown() {
    this.setState({
      isCountDown: false,
    });
  }

  popUpClose() {
    this.setState({
      popUpOpen: false,
    });
  }
  RenderButtonAndSound = () => {
    return Audio.map((soundObj, index) => {
      return (
        <button key={index} onClick={() => this.SoundPlay(soundObj.sound)}>
          {soundObj.label}
        </button>
      );
    });
  };
  render() {
    Howler.volume(1.0);
    return (
      <div className=".App">
        <div id="title-app">FU-DEVER BẦU CUA</div>
        <div id="wrap-content">
          {this.RenderButtonAndSound()}
          <TopPlayer />
          <Options />
          {this.state.isCountDown && (
            <CountDown stopCountDown={() => this.stopCountDown()} />
          )}
        </div>

        <div id="wrap-btns">
          <Button
            name="BẮT ĐẦU CHỌN"
            clicked={() => this.btnAction("countDown")}
          />
          <Button name="QUAY" clicked={() => this.btnAction("start")} />
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
