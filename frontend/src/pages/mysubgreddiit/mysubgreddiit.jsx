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
import LoginIcon from "@mui/icons-material/Login";
import DeleteIcon from "@mui/icons-material/Delete";
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
  const [bannedstring, setbannedstring] = useState("");
  const [tagsstring, settagsstring] = useState("");
  const [username, setusername] = useState(null);
  // const [bannedwords, setbannedwords] = useState([]);
  const [des, setdes] = useState("");
  const [deswords, setdeswords] = useState([]);
  let navigate = useNavigate();
  let des1 = "";
  let tagwords = [];
  const [file, setFile] = useState();
  useEffect(() => {
    console.log("2");
    const email = localStorage.getItem("hello");
    axios
      .post("http://localhost:5000/getusername", {
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
        setusername(response.data);

        // setchange1(change1 + 1);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    const email = localStorage.getItem("hello");
    axios
      .post("http://localhost:5000/mysubgreddiitdata", {
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
      .post("http://localhost:5000/addinrequest", {
        name,
        email,
        store: localStorage.getItem("token"),
        q: localStorage.getItem("hello"),
      })
      .then((response) => {
        console.log(response);
        if (response.data.message === 0) {
          alert("wrong user");
          navigate("/");
          console.log("wrong");
        }
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
      .post("http://localhost:5000/deletesub", {
        Name: name,
        store: localStorage.getItem("token"),
        q: localStorage.getItem("hello"),
      })
      .then((response) => {
        console.log(response);
        if (response.data.message === 0) {
          alert("wrong user");
          navigate("/");
          console.log("wrong");
        }
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
    // console.log(name);
    // console.log(document.getElementById("Description").value);
    // const des = document.getElementById("Description").value;
    const email = localStorage.getItem("hello");
    console.log(des1);
    axios
      .post("http://localhost:5000/mysubgreddiit", {
        name,
        des1,
        email,
        username,
        bannedstring,
        tagwords,
        store: localStorage.getItem("token"),
        q: localStorage.getItem("hello"),
      })
      .then((response) => {
        if (response.data.message === 0) {
          alert("wrong user");
          navigate("/");
          console.log("wrong");
        }
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
  const findbannedwords = async () => {
    // e.preventDefault();
    // console.log(Description)
    des1 = document.getElementById("Description").value;
    if (bannedstring) {
      tagwords = tagsstring.split(",");
      const bannedwords = bannedstring.split(",");
      // const bannedwords = bannedstring.split(",")
      // setdes(document.getElementById("Description").value);

      // console.log(des1);
      console.log(bannedwords);
      // setdeswords(des.split(" "))
      // console.log(deswords)
      // deswords.map((d)=>{

      // })
      await bannedwords.map((b) => {
        var searchMask = `${b}`;
        var regEx = new RegExp(searchMask, "ig");
        var replaceMask = "*";
        // setdes(des.replace(regEx, replaceMask));
        des1 = des1.replace(regEx, replaceMask);
        console.log(des1);
        // setdes(des1)
      });
    }
    submitform();
    // console.log(name);
    // console.log(document.getElementById("Description").value);
  };

  function incvisits(name) {
    console.log("yaha aa gaya");
    axios
      .post("http://localhost:5000/incvisits", {
        Name: name,
        store: localStorage.getItem("token"),
        q: localStorage.getItem("hello"),
      })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const mapfunction = () => {
    return (
      <ul>
        <div className="post">
          <div className="postWrapper">
            <div className="postTop">
              {subgdata.map((s) => {
                {
                  const gg = "/" + s.Name;
                }
                // console.log('httytffttf',s);
                return (
                  <div key={s} className="subg">
                    <p>
                      <span style={{ fontSize: "30px", fontWeight: "bold" }}>
                        {s.Name}
                      </span>
                      <div style={{ float: "right" }}>
                        <span>
                          <DeleteIcon onClick={() => deletesub(s.Name, s.id)} />
                        </span>
                        <span>
                          <Link to={`/subgreddiit/${s.Name}/posts`}>
                            <LoginIcon
                              onClick={() => {
                                incvisits(s.Name);
                              }}
                            ></LoginIcon>
                          </Link>
                        </span>
                        {/* <button
                        className="delete"
                        onClick={() => deletesub(s.Name, s.id)}
                      >
                        Delete
                      </button> */}
                      </div>
                    </p>
                    <span>
                      <b>Moderator:</b> {s.moderator[0].username}
                    </span>
                    <span>
                      <b>Followers:</b> {s.no_of_followers}
                    </span>
                    <span>
                      <b>Posts:</b> {s.no_of_posts}
                    </span>
                    <span className="claimedRight">
                      <b>Description:</b> {s.description}
                    </span>
                    <span className="claimedRight1">
                      <b>Banned keywords:</b> {s.banned_keywords}
                    </span>
                    {/* <span>Tags: {s.tags.join()}</span> */}

                    <span>
                      <button
                        className="follow"
                        disabled
                        // disabled={!isclicked }
                      >
                        Following
                      </button>
                    </span>
                  </div>
                );
                // return <div>
                //   hjvhjvjhvhj
                //   {s.id}
                // </div>
              })}
            </div>
          </div>
        </div>
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
                      value={bannedstring}
                      onChange={(e) => {
                        setbannedstring(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Tags"
                      className="subform"
                      value={tagsstring}
                      onChange={(e) => {
                        settagsstring(e.target.value);
                      }}
                    />
                    {/* <form
                      action="/profile"
                      method="post"
                      enctype="multipart/form-data"
                    >
                      <input type="file" name="avatar" />
                    </form> */}
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
                      disabled={!name||!bannedstring||!tagsstring}
                      onClick={() => {
                        findbannedwords();
                        // submitform();
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
            {done ? (
              mapfunction()
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
