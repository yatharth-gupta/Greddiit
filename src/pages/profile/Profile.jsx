import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState } from "react";

export default function Profile(props) {
  // const [followerusername, setfollowerusername] = useState([]);
  // const [followingusername, setfollowingusername] = useState([]);
  // const [fetched, setfetched] = useState(false);
  
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar email = {props?.userdata?.email}/>
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
                {props?.userdata?.first_name} {props?.userdata?.second_name} 
              </h4>
              <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            {/* {console.log(props?.userdata?.username)} */}
            <Rightbar
              profile
              username={props?.userdata?.username}
              first_name={props?.userdata?.first_name}
              second_name={props?.userdata?.second_name}
              age={props?.userdata?.age}
              contact={props?.userdata?.contact}
              email={props?.userdata?.email}
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
  );
}
