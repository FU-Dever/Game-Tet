import React from "react";

export default class CountDown extends React.Component{

    constructor(props){
        super(props);
    }

    // componentDidMount(){
    //     setInterval(
    //         ()=>this.props.endCountDown(),
    //         15000
    //     )
    // }

    render(){
        return(
            <h2 id="countdown">15</h2>
        );
    }
}