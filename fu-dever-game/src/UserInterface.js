import React, { useEffect, useState } from "react";
import { ref, set, update, onValue } from "firebase/database";
import { db } from "../src/firebase/setup";

export default function UserInterface() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState();
  const [logedIn, setLogedIn] = useState(false);
  const [vans, setVans] = useState([]);
  const [vanPlay, setVanPlay] = useState({});
  const [money, setMoney] = useState(0);
  
  const registerUser = (e) => {
    e.preventDefault();
    set(ref(db, "users/" + username), {
      username: username,
      money: 50,
    });
    setUser({ username, money: 50 });
    setLogedIn(true);
  };
  useEffect(() => {
    const vansRaw = ref(db, "sessions/");
    onValue(vansRaw, (snapshot) => {
      const data = snapshot.val();
      setVans(Object.entries(data));
    });
  }, []);
  const cocAction = () => {
    const updates = {};
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
    console.log(user);
    updates["sessions/" + vanPlay.vanID + "/users/" + user.username] = {
      username: user.username,
      money: money,
      timeChoose: dateTime,
      choices: [2, 3, 1],
    };
    update(ref(db), updates);
    setUser({
      ...user,
      money: user.money - money,
    });
    updates["users/" + user.username] = {
      ...user,
      money: user.money - money,
    };
    update(ref(db), updates);
    setVanPlay({...vanPlay,isCoced:true})
  };
  return (
    <div>
      {logedIn ? (
        <>
          <div>
            <h3>Username: {user.username}</h3>
            <h3>Money: {user.money}</h3>
          </div>
          {vans.map((van) => {
            return (
              <div
                style={{
                  background: van[1].isOpenning ? "green" : "red",
                }}
                onClick={() => {
                  if (van[1].isOpenning) {
                    setVanPlay({vanID:van[0],isCoced:false});
                    const isOpenning = ref(
                      db,
                      "sessions/" + van[0] + "/isOpenning"
                    );
                    onValue(isOpenning, (snapshot) => {
                      const data = snapshot.val();
                    });
                  } else {
                    alert("Can not");
                  }
                }}
              >
                <h3>{van[0]}</h3>
                {vanPlay.vanID !== "" && vanPlay.isCoced===false&&van[1].isOpenning&&(
                  <div>
                    <h3>Van ban chon: {vanPlay.vanID}</h3>
                    <input
                      type="number"
                      min="0"
                      onChange={(e) => {
                        (e.target.value<=user.money)?
                        setMoney(e.target.value):alert("Không đủ tiền")
                      }}
                    />
                    <button onClick={cocAction}>Cọc</button>
                  </div>
                )}
              </div>
            );
          })}
        </>
      ) : (
        <>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
          <button onClick={registerUser}>Play now</button>
        </>
      )}
    </div>
  );
}
