import React from "react";
import Button from "./components/button";
import CountDown from "./components/countdown";
import Options from "./components/options";
import TopPlayer from "./components/top_player";

export default class App extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            optionIndex: 1,
        }
    }

    btnAction(btn){
        if(btn==="start"){
            let optionIndex = Math.floor(Math.random() * 6) + 1;
            console.log(optionIndex)
            this.setState({
                optionIndex: optionIndex,
            })
        }
        else{
            this.setState({
                isCountDown: true
            })
        }
    }

    stopCountDown(){
        this.setState({
            isCountDown: false
        })
    }


    render(){
        return(
            <div className=".App">
                <div id="title-app">FU-DEVER BẦU CUA</div>
                <div id="wrap-content">
                    <TopPlayer/>
                    <Options/>
                    {
                        this.isCountDown &&
                        <CountDown endCountDown={()=>this.stopCountDown()}/>
                    }
                </div>
                <div id="wrap-btns">
                    <Button name="BẮT ĐẦU CHỌN" clicked={()=>this.btnAction("countDown")}/>
                    <Button name="QUAY" clicked={()=>this.btnAction("start")}/>
                </div>
                <h1>Vi tri duoc chon demo data: {this.state.optionIndex}</h1>
            </div>
        );
    }
}