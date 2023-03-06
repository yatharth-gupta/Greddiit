// import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Sidebarchat from "./sidebar";
import Allusers from "./users";
import Message from "./message";
import { io } from "socket.io-client";
export default function Chats() {
  const { username } = useParams();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();
  const [done, setdone] = useState(false);
  const [done1, setdone1] = useState(false);
  const [followers, setfollowers] = useState([]);
  const [following, setfollowing] = useState([]);
  const [Chat, setChat] = useState([]);
  const [Chatdone, setChatdone] = useState(false);
  const [convo, setconvo] = useState(false);
  // const [socket, setsocket] = useState(null);
  var arr = [0];
  const [userdata, setuserdata] = useState("");
  const [isclicked, setisclicked] = useState(true);
  const email = localStorage.getItem("hello");
  let navigate = useNavigate();


  useEffect(() => {
    socket.current = io("http://localhost:5000");
    socket.current.on("getMessage", (data) => {
      console.log("qwerty")
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

  }, []);


  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userdata?.email);
    // socket.current.on("getUsers", (users) => {
    //   setOnlineUsers(
    //     user.followings.filter((f) => users.some((u) => u.userId === f))
    //   );
    // });
  }, [userdata]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/req_data", {
        email: email,
        store: localStorage.getItem("token"),
        q: localStorage.getItem("hello"),
      })
      .then((response) => {
        if (response.data.message === 0) {
          alert("wrong user");
          navigate("/");
          console.log("wrong");
        }

        // console.log("bsdk temp : ", temp);
        setuserdata(response.data);
        // setdone(true);
        // }
        // console.log(users);
        // users.pop()
        // props.onFormSwitch("Login");
        // naviagte("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log("123456789");
    // const all_users_data = async (e) => {
    // e.preventDefault();
    // console.log(person);
    // if (arr[0] === 0) {
    axios
      .post("http://localhost:5000/getfollowers", {
        email: email,
        store: localStorage.getItem("token"),
        q: localStorage.getItem("hello"),
      })
      .then((response) => {
        if (response.data.message === 0) {
          alert("wrong user");
          navigate("/");
          console.log("wrong");
        }

        // console.log("bsdk temp : ", temp);
        setfollowers(response?.data);
        setdone(true);
        // }
        // console.log(users);
        // users.pop()
        // props.onFormSwitch("Login");
        // naviagte("/");
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .post("http://localhost:5000/getfollowing", {
        email: email,
        store: localStorage.getItem("token"),
        q: localStorage.getItem("hello"),
      })
      .then((response) => {
        if (response.data.message === 0) {
          alert("wrong user");
          navigate("/");
          console.log("wrong");
        }

        console.log(response?.data);
        setfollowing(response?.data);
        setdone1(true);

        // }
        // console.log(users);
        // users.pop()
        // props.onFormSwitch("Login");
        // naviagte("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (done && done1) {
      console.log("hello");
      // console.log(following)
      const final = Object.values(followers).filter((a) =>
        following.some((b) => a.Name === b.Name)
      );
      setChat(final);
      setChatdone(true);
    }
  }, [done, done1]);
  useEffect(() => {
    Chat.map((c) => {
      axios
        .post("http://localhost:5000/createconvo", {
          email: email,
          email1: c,
          store: localStorage.getItem("token"),
          q: localStorage.getItem("hello"),
        })
        .then((response) => {
          if (response.data.message === 0) {
            alert("wrong user");
            navigate("/");
            console.log("wrong");
          }
          // setConversations(true)
        })
        .catch(function (error) {
          console.log(error);
        });
    });
    setconvo(true);
  }, [Chatdone]);
  // arr[0]++;
  // }
  const [check, setcheck] = useState(false);
  // let navigate = useNavigate();

  const handleSubmit = (e) => {
    // e.preventDefault();
    const message = {
      sender: userdata.email,
      text: newMessage,
      conversationId: currentChat._id,
    };
    console.log(message);
    const receiverId = currentChat.members.find(
      (member) => member !== userdata.email
    );

    socket.current.emit("sendMessage", {
      senderId: userdata.email,
      receiverId,
      text: newMessage,
    });

    axios
      .post("http://localhost:5000/createmessage", message)
      .then((response) => {
        if (response.data.message === 0) {
          alert("wrong user");
          navigate("/");
          console.log("wrong");
        }
        setMessages([...messages, response.data]);
        setNewMessage("");
        // setConversations(true)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    setdone(false);
    const getConversations = () => {
      axios
        .post("http://localhost:5000/getconvo", {
          email: email,
          store: localStorage.getItem("token"),
          q: localStorage.getItem("hello"),
        })
        .then((response) => {
          if (response.data.message === 0) {
            alert("wrong user");
            navigate("/");
            console.log("wrong");
          }
          setConversations(response?.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getConversations();
    setdone(true);
  }, [convo]);

  useEffect(() => {
    // setdone1(false)
    if (currentChat) {
      const getMessages = () => {
        axios
          .post("http://localhost:5000/getmessages", {
            conversationId: currentChat._id,
            store: localStorage.getItem("token"),
            q: localStorage.getItem("hello"),
          })
          .then((response) => {
            if (response.data.message === 0) {
              alert("wrong user");
              navigate("/");
              console.log("wrong");
            }
            setMessages(response?.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      getMessages();
    }
    // setdone1(true)
  }, [currentChat]);
  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  return done && done1 && Chatdone && convo ? (
    <>
      {/* {console.log(username)} */}
      <Topbar />
      <div className="profile">
        {/* <Sidebarchat email={localStorage.getItem("hello")} /> */}
        <div className="sidebar">
          {/* <div className="App">
        <h2>Add Image:</h2>
        <input type="file" onChange={handleChange} />
      </div> */}
          <div className="sidebarWrapper">
            <ul className="sidebarFriendList">
              {/* {console.log(Chat)} */}
              {Object.values(conversations).map((u) => {
                // console.log(u);
                return (
                  <div onClick={() => setCurrentChat(u)}>
                    <Allusers conversation={u} currentUser={userdata} />
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="profileRight">
          <div style={{ paddingLeft:"10px", marginTop:"13%"}}>
            {/* <Feed /> */}
            {/* {console.log(username)} */}
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div>
                      <Message message={m} own={m.sender === userdata.email} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className="chatSubmitButton"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
            {/* <Rightbar
              profile
              username={userdata?.username}
              first_name={userdata?.first_name}
              second_name={userdata?.second_name}
              age={userdata?.age}
              contact={userdata?.contact}
              email={userdata?.email}
              // followerusername = {followerusername}
              // followingusername = {followingusername}
              // setfollowerusername = {setfollowerusername}
              // setfollowingusername = {setfollowingusername}
              // fetched = {fetched}
              // setfetched = {setfetched}
            /> */}
          </div>
        </div>
      </div>
    </>
  ) : (
    // <p>helooo</p>
    <CircularProgress
      size={70}
      sx={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
      }}
    />
  );
}
