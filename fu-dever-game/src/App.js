import React from "react";
import BingoPopUp from "./components/bingo_pop_up";
import Button from "./components/button";
import CountDown from "./components/count_down";
import Options from "./components/options";
import TopPlayer from "./components/top_player";

export default class App extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            optionIndex: [],
            isCountDown:false,
            popUpOpen: false,
        }
    }

    btnAction(btn){
        if(btn==="start"){
            let optionIndex1 = Math.floor(Math.random() * 5);  
            let optionIndex2 = Math.floor(Math.random() * 5);  
            let optionIndex3 = Math.floor(Math.random() * 5);  

            let optionIndex = [optionIndex1, optionIndex2, optionIndex3]

            this.setState({
                optionIndex: optionIndex,
                popUpOpen: true
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


    popUpClose(){
        this.setState({
            popUpOpen: false
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
                        this.state.isCountDown &&
                        <CountDown stopCountDown={()=>this.stopCountDown()}/>
                    }
                </div>
                    
                <div id="wrap-btns">
                    <Button name="BẮT ĐẦU CHỌN" clicked={()=>this.btnAction("countDown")}/>
                    <Button name="QUAY" clicked={()=>this.btnAction("start")}/>
                </div>

                {
                    this.state.popUpOpen &&
                    <BingoPopUp close={()=>this.popUpClose()} data={this.state.optionIndex}/>
                }
            </div>
        );
    }
}

