import "./mysubgreddiit.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Description, FlashAuto, SendTwoTone } from "@mui/icons-material";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

// const express = require("express");
// const app = express();
// app.use(bodyparser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.static("public"));

export default function Mysubgreddiit(props) {
  const [name, setname] = useState("");
  const [subgdata, setsubgdata] = useState([]);
  const [add, setadd] = useState(false);
  const [done, setdone] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    const email = localStorage.getItem("hello");
    axios
      .post("http://localhost:5000/mysubgreddiitdata", { email: email })
      .then((response) => {
        // setResponse(response.data)
        // console.log(response);
        // props.onFormSwitch("Login");
        // naviagte("/");
        var temp = [];
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
            no_of_followers: response?.data[i]?.no_of_followers,
            no_of_posts: response?.data[i]?.no_of_posts,
            moderator: response?.data[i]?.moderator,
            followers: response?.data[i]?.followers,
            request: response?.data[i]?.request,
            Name: response?.data[i]?.Name,
            description: response?.data[i]?.description,
            tags: response?.data[i]?.tags,
            banned_keywords: response?.data[i]?.banned_keywords,
          });
          // }
        }

        setsubgdata(temp);
        console.log("bsdk : ", temp);
        setdone(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [add]);
  function addinrequest(name) {
    // setisclicked(true)
    const email = localStorage.getItem("hello");
    axios
      .post("http://localhost:5000/addinrequest", { name, email })
      .then((response) => {
        console.log(response);
        // alert("added");
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
  function deletesub(name, index) {
    // setisclicked(true)
    console.log(index);
    const email = localStorage.getItem("hello");
    axios
      .post("http://localhost:5000/deletesub", { Name: name })
      .then((response) => {
        console.log(response);
        // alert("added");
        // setfollowingusername((followingusername) => [
        //   ...followingusername,
        //   users[index].username,
        // ]);
        // <Navigate to="/"></Navigate>
        // navigate("/home")
        // delete subgdata[index]
        console.log("abc");
        setadd(!add);
        // setdone(true)
        // navigate("/mysubgreddiit")
      })
      .catch(function (error) {
        console.log(error);
      });
    // <Rightbar/>
  }
  const submitform = () => {
    // e.preventDefault();
    // console.log(Description)
    console.log(name);
    console.log(document.getElementById("Description").value);
    const des = document.getElementById("Description").value;
    const email = props.userdata.email;
    const username = props.userdata.username;
    axios
      .post("http://localhost:5000/mysubgreddiit", {
        name,
        des,
        email,
        username,
      })
      .then((response) => {
        // setResponse(response.data)
        console.log(response);
        setadd(!add);
        // navigate("/mysubgreddiit")
        // props.onFormSwitch("Login");
        // naviagte("/");
      })
      .catch(function (error) {
        console.log(error);
      });
    // setadd(!add)
  };
  const mapfunction = () => {
    return (
      <ul>
        {subgdata.map((s) => {
          {
            const gg = "/" + s.Name;
          }
          // console.log('httytffttf',s);
          return (
            <div key={s} className="subg">
              {/* <p>heloooooooooooo</p> */}
              <Link to={`/subgreddiit/${s.Name}`}>
                <p> {s.Name}</p>
              </Link>
              {/* <a href="/asxcvgfd">{s.description}</a> */}
              <span>Moderator: {s.moderator[0].username}</span>
              <span>Followers: {s.no_of_followers}</span>
              <span>Posts: {s.no_of_posts}</span>
              <span>Description: {s.description}</span>
              <span>Banned keywords: {s.banned_keywords}</span>

              <span>
                <button
                  className="follow"
                  disabled
                  // disabled={!isclicked }
                >
                  Following
                </button>
              </span>
              <span>
                <button
                  className="delete"
                  onClick={() => deletesub(s.Name, s.id)}
                >
                  Delete
                </button>
              </span>
            </div>
          );
          // return <div>
          //   hjvhjvjhvhj
          //   {s.id}
          // </div>
        })}
      </ul>
    );
    // return <p>helooooooooooooo</p>
  };
  return (
    <>
      <Topbar />
      <div className="profile">
        {/* <Sidebar email={props?.userdata?.email} /> */}
        <div className="profileRight">
          {/* <div className="profileRightTop"> */}
          <div className="profileCover">
            {/* <img
                className="profileCoverImg"
                src="assets/post/3.jpeg"
                alt=""
              /> */}
            <img className="profileUserImg" src="assets/person/7.jpeg" alt="" />
          </div>
          <div className="profileInfo">
            <h1>
              <u>
                {/* {props?.userdata?.first_name} {props?.userdata?.second_name} */}
                My Subgreddiit
              </u>
            </h1>
          </div>

          <div className="profileInfo">
            <Popup
              trigger={<button className="profileInfoName">Add New</button>}
              modal
              nested
            >
              {(close) => (
                <>
                  <p style={{ textAlign: "center", fontSize: "30px" }}>
                    {" "}
                    <u> Create new Subgreddiit</u>
                  </p>
                  <form className="modal">
                    <input
                      type="text"
                      required={true}
                      placeholder="Name"
                      className="subform"
                      value={name}
                      onChange={(e) => {
                        setname(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Banned Keywords"
                      className="subform"
                    />
                    <input type="text" placeholder="Tags" className="subform" />
                    {/* <input type="text" placeholder="Description" className="subform1" /> */}
                    <textarea
                      name="Description"
                      id="Description"
                      cols="30"
                      rows="5"
                      placeholder="Description"
                    ></textarea>
                  </form>
                  <div className="profileInfoName">
                    <button
                      className="formsubmit"
                      onClick={() => {
                        submitform();
                        close();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </Popup>
            {/* </div> */}
            {done ? mapfunction() : <CircularProgress
      size={70}
      sx={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
      }}
    />}
          </div>
        </div>
      </div>
    </>
  );
}
