import React, { useEffect, useState } from "react";
import { ref, set, update, onValue } from "firebase/database";
import { db } from "../src/firebase/setup";

export default function UserInterface() {
  const [user, setUser] = useState();
  const [vans, setVans] = useState([]);
  const [choicesOrigin,setChoiceOrigin]=useState([0,0,0,0,0,0]);

  useEffect(() => {
    const vansRaw = ref(db, "sessions/");
    onValue(vansRaw, (snapshot) => {
      setVans(Object.entries(snapshot.val()));
    });
    
    const userRef = ref(db, 'users/' +user?.username);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data!==null) setUser(data)
  });
  },[]);

  const registerUser = () => {
    const username = document
      .querySelector("#username")
      .value.trim()
      .toUpperCase();
    const password=document.querySelector("#password").value.trim();
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
          alert("Passwords do not match")
          else setUser(snapshot.val())
        }
      });
    } else alert("MSSV Không Hợp Lệ!");
  };

  const checkChoices=(e,index)=>{
    const newStatus=[...choicesOrigin]
    newStatus[index]=+e.target.value;
    setChoiceOrigin(newStatus)
  }
  const cocAction = (vanID) => {
    const choices = [];
    choicesOrigin.map((choice,i)=>{
      choice!==0&&choices.push({
        choice:i,
        money:choice
      })
    })
    let totalCoc = choices.reduce((acc, cur) => acc + cur.money, 0);
    if (totalCoc===0) totalCoc=10
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
    document.querySelector("#" + vanID).style.display = "none";
    
  };
  return (
    <div>
      {user !== undefined ? (
        <>
          <div>
            <h3>Username: {user?.username}</h3>
            <h3>Money: {user?.money}</h3>
          </div>
          {vans.map((van) => {
            if (van[1].isOpenning) {
              return (
                <div id={van[0]}>
                  <h3>Mã ván: {van[0]}</h3>
                  <div id="wrap-options">
                    <div className="option">
                        <img src="./assets/images/deer.png" alt="option"/>
                        <input type="number" min="0" max={user.money} onChange={(e)=>checkChoices(e,0)}/>
                    </div>
                    <div className="option">
                        <img src="./assets/images/crab.jpg" alt="option"/>
                        <input type="number" min="0" max={user.money} onChange={(e)=>checkChoices(e,1)}/>
                    </div>
                    <div className="option">
                        <img src="./assets/images/fish.png" alt="option"/>
                        <input type="number" min="0" max={user.money} onChange={(e)=>checkChoices(e,2)}/>
                    </div>
                    <div className="option">
                        <img src="./assets/images/shrimp.png" alt="option"/>
                        <input type="number" min="0" max={user.money} onChange={(e)=>checkChoices(e,3)}/>
                    </div>
                    <div className="option">
                        <img src="./assets/images/cook.png" alt="option"/>
                        <input type="number" min="0" max={user.money} onChange={(e)=>checkChoices(e,4)}/>
                    </div>
                    <div className="option">
                        <img src="./assets/images/calabash.png" alt="option"/>
                        <input type="number" min="0" max={user.money} onChange={(e)=>checkChoices(e,5)}/>
                    </div>
                </div>       
                  <button onClick={() => cocAction(van[0])}>Cọc</button>
                </div>
              );
            }
          })}
        </>
      ) : (
        <>
         <div>
          <div className="img-wrap">
            <img src="../assets/images/bct.png" alt="" />
          </div>
          <div className="wrap-login">
            <h1>Login</h1>
            <label for="uname"><b>Mã Sinh Viên</b></label>
            <input type="text" id="username" placeholder="MSSV" />
            <label for="uname"><b>Key login</b></label>
            <input type="text" id="password" placeholder="Key Log" />
            <button class="button" onClick={registerUser}>Play now</button>
          </div>
        </div>
        </>
      )}
    </div>
  );
}
