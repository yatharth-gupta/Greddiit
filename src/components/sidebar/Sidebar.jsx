import "./sidebar.css";
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
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Rightbar from "../rightbar/Rightbar";  

export default function Sidebar({
  email
}) {
  const [users, setusers] = useState([]);

  var arr = [0];
  const [isclicked, setisclicked] = useState(true);
  useEffect(() => {
    console.log("123456789");
    // const all_users_data = async (e) => {
    // e.preventDefault();
    // console.log(person);
    // if (arr[0] === 0) {
    axios
      .post("http://localhost:5000/all_users", { message: 1 })
      .then((response) => {
        // setResponse(response.data)
        // if (users.length === 0) {
        console.log("987654321");
        // console.log(response.data.us);
        // console.log(response.data.us[0]);
        var temp = [];
        let k = 0;
        console.log(response?.data?.length);
        for (let i = 0; i < response?.data?.length; i++) {
          // if (arr[0] === 0) {
          // if (users.length >= response.data?.length) {
          //   continue;
          // }
          // console.log(response?.data[i]?.email);
          // if (response?.data[i]?.email === email) {
          //   console.log("qwerty");
          //   k = 1;
          //   continue;
          // }
          temp.push({
            id: i,
            // id: i - k,
            // isclick : false,
            first_name: response?.data[i]?.first_name,
            second_name: response?.data[i]?.second_name,
            username: response?.data[i]?.username,
            email: response?.data[i]?.email,
          });
          // }
        }

        console.log("bsdk temp : ", temp);
        setusers(temp);
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
  // arr[0]++;
  // }
  const [check, setcheck] = useState(false);
  let navigate = useNavigate();
  function addinfollowing(index) {
    // setisclicked(true)
    const email1 = users[index].email;
    console.log(email1);
    axios
      .post("http://localhost:5000/addinfollowing", { email, email1 })
      .then((response) => {
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
  return (
    <div className="sidebar">
      {/* {all_users_data()} */}
      <div className="sidebarWrapper">
        {/* <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" /> */}

        <ul className="sidebarFriendList">
          {/* axios.post('http://localhost:5000/signup', person)
      .then((response) => {
        // setResponse(response.data)
        console.log(response.data)
        props.onFormSwitch("Login");
        naviagte("/")
      })
      .catch(function (error) {
        console.log(error);
      }); */}
          {/* axios.post('http://localhost:5000/all_users',) */}
          {/* {users.map((u) => (
            <li key={u.id} user={u}>
              {u.first_name} {u.second_name}
              console.log({u.id});
            </li>
          ))} */}
          {/* {console.log(users[0])} */}
          {users.map((u) =>
            // if(u.email!=email)
            // {console.log("my")}
            // else
            // {console.log("notmy")}
            u.email !== localStorage.getItem("hello") ? (
              <div key={u.id} className="users">
                <span>
                  {u.first_name} {u.second_name}
                </span>

                <span style={{ float: "right" }}>
                  <button
                    className="follow"
                    onClick={() => addinfollowing(u.id)}
                    // disabled={!isclicked }
                  >
                    Follow
                  </button>
                </span>
              </div>
            ) : (
              <div className="users_my">
                <span>
                  {u.first_name} {u.second_name}
                </span>
              </div>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
