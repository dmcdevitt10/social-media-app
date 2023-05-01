import { useState, useContext } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(username)
    // console.log(password)
    console.log("submitHandler called");

    const userBody = {
      username,
      password,
    };

    if (register) {
      axios
        .post(`https://socialmtn.devmountain.com/register`, userBody)
        .then((res) => {
          console.log(res.data);
          authCtx.login(res.data.token, res.data.exp, res.data.userId)
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(`https://socialmtn.devmountain.com/login`, userBody)
        .then((res) => {
          console.log(res.data);
          authCtx.login(res.data.token, res.data.exp, res.data.userId)
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setUsername("");
    setPassword("");

  };

  let authCtx = useContext(AuthContext);

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Username"
          className="form-input"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="form-input"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
