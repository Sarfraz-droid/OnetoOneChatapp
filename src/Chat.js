import React, { useState, useEffect , useRef} from "react";
import RecieveMessage from "./components/Chat/RecieveMessage";

import SendMessage from "./components/Chat/SendMessage";
import ScrollToBottom from 'react-scroll-to-bottom';


import Logo from "./image/logo.svg";
import Plus from "./image/plus.svg";
import Send from "./image/sendMessage.svg";

import { useSelector, useDispatch } from "react-redux";

function Chat(props) {
  const msg = useSelector((state) => state.message);
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const [info, setInfo] = useState([]);
  const [Message, setMessage] = useState("");
  const [Curr, setCurr] = useState("Admin");
  const [client, setClient] = useState([]);
const [users, setUsers] = useState([]);
const dispatch = useDispatch();
  useEffect(() => {
    props.socket.on("recieveMessage", (data) => {
      setInfo((getinfo) => [...getinfo, data]);
      dispatch({ type: "ADD", toName: data.senderName , Name: data.senderName , Message: data.message});
    });
    props.socket.on("Client", (data) => {
      console.log(data);
      setClient(data.client);
    });

    

    props.socket.on("UserList", (data) => {
        const userdata = [];
        data.map((user) => {
            if(user!== props.Name)
            {
                userdata.push(user);
            }
        })
        setUsers(userdata);
        
    });

    scrollToBottom()


  }, []);

  const sendMessage = () => {
    const data = {
      senderName: props.Name,
      recieverName: Curr,
      message: Message,
    };
    console.log(data);
    props.socket.emit("sendMessage", data);
    setInfo((getinfo) => [...getinfo, data]);
    dispatch({ type: "ADD", toName: Curr, Name:props.Name , Message: Message});
    setMessage("");

  };
  return (
    <div className="chat">
      <div className="chat-left">
        <div className="chat-header">
          <ul className="header">
            <li>
              <img className="logo" src={Logo} alt="logo" />
            </li>
            <li>
              <img className="plus" src={Plus} />
            </li>
          </ul>
        </div>
        <div className="chat-list">
          <ul className="chat-User">
            {users.map((user,index) => {
                return (
                    <li onClick={() => setCurr(user)}>
                        {user}
                    </li>
                )
            })}
          </ul>
        </div>
      </div>
      <div className="chat-right">
        <div className="chat-message-header">
          <h2>{Curr}</h2>
        </div>

        <ScrollToBottom  className="chat-message" >
          <ul>
            {msg.hasOwnProperty(Curr) == true
              ? msg[Curr].map((data, index) => {
                  return (
                    <li>
                      {data.Name == props.Name ? (
                        <SendMessage message={data.Message} />
                      ) : (
                        <RecieveMessage
                          message={data.Message}
                          heading={data.Name}
                        />
                      )}
                    </li>
                  );
                })
              : null}
          </ul>
          <span ref={messagesEndRef}></span>

        </ScrollToBottom >

        {  Curr !== "Admin" ? (
        <div className="chat-sendmessage">

          <input
            value={Message}
            placeholder="Message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={() => sendMessage()} disabled={Message==""}>
            <img src={Send} />
          </button>
        </div>
      ) : <h4>
          the bar on left gives list of all users
          </h4>}
      </div>
    </div>
  );
}

export default Chat;
