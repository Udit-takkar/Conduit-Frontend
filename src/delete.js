import React, { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios
      .post("https://conduit.productionready.io/api/users", {
        user: {
          username: "testingbolte13",
          email: "testingbolte13@gmail.com",
          password: "jakejake",
        },
      })
      .then((res) => {
        localStorage.setItem("token", res.data.user.token);
        return res.data.user.token;
      })

      .catch((err) => console.log(err));
  }, []);

  const login = () => {
    const token = JSON.stringify(localStorage.getItem("token"));

    axios
      .post(
        "https://conduit.productionready.io/api/users/login",
        {
          user: {
            email: "testingbolte13@gmail.com",
            password: "jakejake",
          },
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      <h1>Hello</h1>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;
