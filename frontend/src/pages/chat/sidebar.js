// import "./sidebar.css";
import axios from "axios";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

// import CloseFriend from "../closeFriend/CloseFriend";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Allusers from "./users";
// import Rightbar from "../rightbar/Rightbar";

export default function Sidebarchat({ email }) {
  const [done, setdone] = useState(false);
  const [done1, setdone1] = useState(false);
  const [followers, setfollowers] = useState([]);
  const [following, setfollowing] = useState([]);
  const [Chat, setChat] = useState([]);
  const [Chatdone, setChatdone] = useState(false);
  var arr = [0];
  const [isclicked, setisclicked] = useState(true);
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
        setfollowers(response.data);
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

        console.log(response.data);
        setfollowing(response.data);
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
  
  // arr[0]++;
  // }
  const [check, setcheck] = useState(false);
  let navigate = useNavigate();
  function addinfollowing(index) {
    // setisclicked(true)
    const email1 = Chat[index].email;
    console.log(email1);
    axios
      .post("http://localhost:5000/addinfollowing", {
        email,
        email1,
        store: localStorage.getItem("token"),
        q: localStorage.getItem("hello"),
      })
      .then((response) => {
        if (response.data.message === 0) {
          alert("wrong user");
          navigate("/");
          console.log("wrong");
        }
        console.log(response);
        // alert("added");
        setisclicked(false);
        // setfollowingusername((followingusername) => [
        //   ...followingusername,
        //   users[index].username,
        // ]);
        // <Navigate to="/"></Navigate>
        // navigate("/home")

        console.log("abc");
      })
      .catch(function (error) {
        console.log(error);
      });
    // <Rightbar/>
  }

  // console.log(email);
  // };
  // }, arr);
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  return done && done1 && Chatdone ? (
    <div className="sidebar">
      {/* <div className="App">
        <h2>Add Image:</h2>
        <input type="file" onChange={handleChange} />
      </div> */}
      <div className="sidebarWrapper">
        <ul className="sidebarFriendList">
          {/* {console.log(Chat)} */}
          {Chat.map((u,i) => {
            return <Allusers key={i} chat={u}/>
})}
        </ul>
      </div>
    </div>
  ) : (
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
