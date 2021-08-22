import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import Logo from "./image/logo.svg";

import { useSelector,useDispatch } from "react-redux";

import firebase from "./firebase"

function Home(props) {
  const [State, setState] = useState(0);
  
  const history = useHistory();

  const [Pass, setPass] = useState("");
  const [Err, setErr] = useState("");

  const dispatch = useDispatch();
  const Error = useSelector(state => state.Login);

  useEffect(() => {
    props.socket.on("user-R",(data) => {
      if(data.success == false) 
      {
        dispatch({type: "ERROR", message: data.message});
        history.push("/error");
      }else{
        history.push("/chat");
      }
    })
  }, [props.socket])

  const login = (e) => {
    e.preventDefault();
    props.socket.emit("Register", {
      name: props.Name,
    });
  };

  const SignUp = (e) => {
    e.preventDefault();
    console.log("SignUp");
    firebase
      .auth()
      .createUserWithEmailAndPassword(props.Name, Pass)
      .then((userCredential) => {
        // Signed in
        history.push("/chat");
        var user = userCredential.user;
        console.log(user);
        props.setUser(user);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        setErr(errorMessage);
        // ..
      });
  };

  const LogIn = (e) => {
    e.preventDefault();
    console.log("SignIn");
    firebase.auth().signInWithEmailAndPassword(props.Name, Pass)
    .then((userCredential) => {
      // Signed in
      console.log(userCredential);
      history.push("/chat");
      var user = userCredential.user;
      props.setUser(user);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      setErr(errorMessage);
    });
  };

  return (
    <div className="home">
      <div className="L-Home">
        <img src={Logo} />
        <p>
          Hello There! LogIn/SignUp by filling out your Username and Password.
        </p>
      </div>
      <div className="R-Home">
        <form onSubmit={login}>


          <span>
            {Err}
          </span>

          <input
            name="name"
            placeholder="Nome"
            value={props.Name}
            onChange={(e) => props.setName(e.target.value)}
          />

          <button>Join</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
