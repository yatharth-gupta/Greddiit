import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
export default function Profile() {
  // const [followerusername, setfollowerusername] = useState([]);
  // const [followingusername, setfollowingusername] = useState([]);
  // const [fetched, setfetched] = useState(false);
  const [done, setdone] = useState(false);
  let navigate = useNavigate();
  const [userdata, setuserdata] = useState(null);
  useEffect(() => {
    const Email = localStorage.getItem("hello");
    console.log(Email);
    axios
      .post("http://localhost:5000/req_data", {
        email: Email,
        store: localStorage.getItem("token"),q:localStorage.getItem("hello"),
      })
      .then((response) => {
        console.log(response);
        if (response.data.message === 0) {
          alert("wrong user");
          navigate("/");
          console.log("wrong");
        } else {
          setuserdata(response?.data);
          setdone(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return done ? (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar email={userdata?.email} />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="assets/post/3.jpeg"
                alt=""
              />
              <img
                className="profileUserImg"
                src="assets/person/7.jpeg"
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">
                {userdata?.first_name} {userdata?.second_name}
              </h4>
              <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            {/* {console.log(userdata?.username)} */}
            <Rightbar
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
            />
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
