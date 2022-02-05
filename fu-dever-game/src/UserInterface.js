import React, { useEffect, useState } from "react";
import { ref, set, update, onValue } from "firebase/database";
import { db } from "../src/firebase/setup";
import "./login.css"
export default function UserInterface() {
  const [user, setUser] = useState();
  const [vans, setVans] = useState([]);
  const [choicesOrigin,setChoiceOrigin]=useState([0,0,0,0,0,0]);

  useEffect(() => {
    const vansRaw = ref(db, "sessions/");
    onValue(vansRaw, (snapshot) => {
      setVans(Object.entries(snapshot.val()));
      setChoiceOrigin([0,0,0,0,0,0])
    });
    
    const userRef = ref(db, 'users/' +user?.username);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data!==null) { 
        setUser(data);
      }
  });
  },[]);

  const registerUser = () => {
    const username = document
      .querySelector("#username")
      .value.trim()
      .toUpperCase();
    const password = document.querySelector("#password").value.trim();
    if (username.match(/\bD(E|S|A)[0-9]{6}\b/g)) {
      const user = ref(db, "users/" + username);
      onValue(user, (snapshot) => {
        if (snapshot.val() === null) {
          set(ref(db, "users/" + username), {
            username,
            password,
            money: 50,
          });
        } else{
          if (snapshot.val().password !==password) 
          alert("Mật khẩu không hợp lệ")
          else{
            setUser(snapshot.val())
          }
        }
      });
    } else alert("MSSV Không Hợp Lệ!");
  };

  const checkChoices=(e,index)=>{
    const newStatus=[...choicesOrigin]
    newStatus[index]=+e.target.value;
    let numCoc=0;
    newStatus.map(ob=>{numCoc+=ob===0?0:1})
    console.log(newStatus)
    if (numCoc>3) {
      newStatus[index]= e.target.value=0;
      alert("Bạn chỉ được cọc tối đa 3 con")
    }
    else{
      let total=newStatus.reduce((acc,cur)=>acc+cur,0);
      if (total>user.money){
        alert("Bạn không đủ tiền");
        newStatus[index]= e.target.value=Math.floor(newStatus[index]/10);
      }
    }
    setChoiceOrigin(newStatus)
    console.log(newStatus);
  }
  const cocAction = (vanID) => {
    const choices = [
      { choice: 2, money: 2 },
      { choice: 2, money: 2 },
      { choice: 2, money: 2 },
    ];
    let totalCoc = choices.reduce((acc, cur) => acc + cur.money, 0);
    if (totalCoc !== 0) {
      const updates = {};
      updates["sessions/" + vanID + "/users/" + user.username] = {
        username: user.username,
        choices: choices,
      };
    
      updates["users/" + user.username] = {
        ...user,
        money: user.money -totalCoc,
      };
      update(ref(db), updates);
      setChoiceOrigin([0,0,0,0,0,0])
      document.querySelector("#" + vanID).style.display = "none";
    }
    
  };
  return (
    <div>
      {user !== undefined? (
        <>
          <div>
            <h3>Username: {user.username}</h3>
            <h3>Money: {user.money}</h3>
          </div>
          {vans.map((van) => {
            if (van[1].isOpenning) {
              return (
                <div id={van[0]}>
                  <h3>Mã ván: {van[0]}</h3>

                  <button onClick={() => cocAction(van[0])}>Cọc</button>
                </div>
              );
            }
          })}
          <div id="wrap-options">
            <div className="option">
              <img src="./assets/images/deer.png" alt="option" />
              <input type="number" min="0" key="1" max={user.money} onChange={checkChoices} />
            </div>
            <div className="option">
              <img src="./assets/images/crab.jpg" alt="option" />
              <input type="number" min="0" key="2" max={user.money} onChange={checkChoices} />
            </div>
            <div className="option">
              <img src="./assets/images/fish.png" alt="option" />
              <input type="number" min="0" key="3" max={user.money} onChange={checkChoices} />
            </div>
            <div className="option">
              <img src="./assets/images/shrimp.png" alt="option" />
              <input type="number" min="0" key="4" max={user.money} onChange={checkChoices} />
            </div>
            <div className="option">
              <img src="./assets/images/cook.png" alt="option" />
              <input type="number" min="0" key="5" max={user.money} onChange={checkChoices} />
            </div>
            <div className="option">
              <img src="./assets/images/calabash.png" alt="option" />
              <input type="number" min="0" key="6" max={user.money} onChange={checkChoices} />
            </div>
          </div>
        </>
      ) : (
        <>
         <div>
          <div className="img-wrap">
            <img src={require("../src/assets/images/bct.png")} alt="" />
          </div>
          <div className="wrap-login">
            <h1>Login</h1>
            <label for="uname"><b>Mã Sinh Viên</b></label>
            <input type="text" id="username" placeholder="MSSV" />
            <label for="uname"><b>Key login</b></label>
            <input type="text" id="password" placeholder="Key Log" />
            <button className="button" onClick={registerUser}>Play now</button>
          </div>
        </div>
        </>
      )}
    </div>
  );
}
