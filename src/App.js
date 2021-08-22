import React,{useState} from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./Home";
import Chat from "./Chat";
import Err from "./Err";
import "./scss/home.scss"
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

function App() {

  const [Name, setName] = useState("")

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/chat">
            <Chat socket={socket} Name={Name} />
          </Route>
          <Route path="/error">
            <Err />
          </Route>
          <Route exact path="/">
            <Home socket = {socket} Name={Name} setName={setName} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
