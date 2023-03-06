import { MoreVert } from "@mui/icons-material";
import { Users } from "../../dummyData";
import { useEffect, useState } from "react";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import ReportIcon from "@mui/icons-material/Report";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { CircularProgress } from "@mui/material";
export default function Allusers({ conversation, currentUser }) {
//     const [Chatname, setChatname] = useState([]);
//     const [Chatdone, setChatdone] = useState(false);
    let navigate = useNavigate()
//     const [isclicked,setisclicked] = useState(false)
//     function startchat(){
//         navigate(`/chats/${Chatname}`)
//         setisclicked(true)
//     }
//     useEffect(() => {
//           console.log("hi")
//           axios
//             .post("http://localhost:5000/req_data", {
//               email: chat,
//               store: localStorage.getItem("token"),
//               q: localStorage.getItem("hello"),
//             })
//             .then((response) => {
//               if (response.data.message === 0) {
//                 alert("wrong user");
//                 navigate("/");
//                 console.log("wrong");
//               }
//               console.log(response.data);
//               setChatname(response.data.first_name + " " + response.data.second_name)
//               setChatdone(true)
//             })
//             .catch(function (error) {
//               console.log(error);
//             });

//       }, []);
//   return (
//     <div className="users">
//                 <span>
//                   {Chatname}
//                 </span>

//                 <span style={{ float: "right" }}>
//                   <button
//                     className="follow"
//                     onClick={() => startchat()}
//                     disabled={isclicked }
//                   >
//                     Chat
//                   </button>
//                 </span>
//               </div>
//   );
const [user, setUser] = useState(null);
const [done, setdone] = useState(false);
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.email);
    console.log(friendId)
    axios
      .post("http://localhost:5000/req_data", {
        email: friendId,
        store: localStorage.getItem("token"),
        q: localStorage.getItem("hello"),
      })
      .then((response) => {
        console.log(response?.data)
        if (response.data.message === 0) {
          alert("wrong user");
          navigate("/");
          console.log("wrong");
        }
        setUser(response?.data)
        setdone(true)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    done?(
    <div className="conversation">
      {/* <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
      /> */}
      <span className="conversationName">{user.first_name} {user.second_name}</span>
    </div>):(<CircularProgress
      size={70}
      sx={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
      }}
    />)
  );
}
