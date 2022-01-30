import React, { useEffect, useState } from "react";
import { ref, set, update, onValue } from "firebase/database";
import { db } from "../src/firebase/setup";
import "./login.css"
export default function UserInterface() {
  const [user, setUser] = useState();
  const [vans, setVans] = useState([]);
  const [choicesOrigin, setChoiceOrigin] = useState([0, 0, 0, 0, 0, 0]);
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
          setUser({ username, money: 50 });
        } else {
          (snapshot.val().password === password) ? setUser(snapshot.val()) : alert("Có thể do áp lực khiến bạn không nhớ mật khẩu, Hãy thư giãn và thử lại lần sau, xin cảm ơn")
        }
      });
    } else alert("MSSV Không Hợp Lệ!");
  };
  useEffect(() => {
    const vansRaw = ref(db, "sessions/");
    onValue(vansRaw, (snapshot) => {
      setVans(Object.entries(snapshot.val()));
    });
  }, []);
  const checkChoices = (e) => {
    console.log(e.target.key);
    const newStatus = [...choicesOrigin]
    newStatus[+e.target.key - 1] = e.target.value;
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
    if (totalCoc === 0) totalCoc = 10
    const updates = {};
    updates["sessions/" + vanID + "/users/" + user.username] = {
      username: user.username,
      choices: choices,
    };
    update(ref(db), updates);
    updates["users/" + user.username] = {
      ...user,
      money: user.money - totalCoc,
    };
    update(ref(db), updates);
    setUser({
      ...user,
      money: user.money - totalCoc,
    });
    document.querySelector("#" + vanID).style.display = "none";
  };
  return (
    <div>
      {user !== undefined ? (
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

        <div id="login-form">

          <h3>Login</h3>
          <input type="text" id="username" placeholder="MSSV" />
          <input type="text" id="password" placeholder="Key Log" />
          <button class="button" onClick={registerUser}>Play now</button>

        </div>
      )}
    </div>
  );
}
