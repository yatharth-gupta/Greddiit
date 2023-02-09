import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Collapse } from "@mui/material";
import { useEffect } from "react";
import { set } from "mongoose";
import CancelIcon from "@mui/icons-material/Cancel";
import  React  from "react";

const Rightbar = React.memo(function Rightbar (props) {
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
            ))}
        </ul>
      </>
    );
  };
  
  const ProfileRightbar = () => {
    const [Person_update, setPerson_update] = useState({
      first_name: props.first_name,
      second_name: props.second_name,
      age: props.age,
      contact: props.contact,
      username: props.username,
      email: props.email,
    });
    // const [alert, setalert] = useState(null);
    let navigate = useNavigate();
    const updatedb = (e) => {
      e.preventDefault();
      console.log(Person_update);
      axios
      .post("http://localhost:5000/update", { user: Person_update })
      .then((response) => {
        // setResponse(response.data)
        if (response.data.message === 1) {
          console.log(response.data);
          console.log("yayyyyyy");
          // props.onFormSwitch("Login");
          // navigate("/Profile_page");
          // setalert("aaa");
            alert("updated");
          } else {
            alert("err");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      };
      
      const onChangeHandler = (event) => {
        const { name, value } = event;
        setPerson_update((prev) => {
          return { ...prev, [name]: value };
        });
      };

      // function addfollowerusername(data) {
        //   setfollowerusername((followerusername) => [
    //     ...followerusername,
    //     res3.data,
    //   ]);
    // }
    
    const [load, setload] = useState(false);
    const [open, setopen] = useState(false);
    const [followersemail, setfollowersemail] = useState([]);
    const [followerusername, setfollowerusername] = useState([]);
    const [followingemail, setfollowingemail] = useState([]);
    const [followingusername, setfollowingusername] = useState([]);
    const [fetched, setfetched] = useState(false);
    const [count,setcount] = useState(false);
    const [number,setnumber] = useState(0);
    const [number1,setnumber1] = useState(0);
    useEffect(() => {
      setfollowersemail([])
      setfollowingemail([])
      async function fetchData() {
        const res = await axios.post("http://localhost:5000/getfollowers", {
          email: props.email,
        });
        try {
          console.log(res);
          setfollowersemail(res.data);
        } catch (err) {
          console.log(err);
        }
        const res1 = await axios.post("http://localhost:5000/getfollowing", {
          email: props.email,
        });
        try {
          console.log(res1);
          setfollowingemail(res1.data);
        } catch (err) {
          console.log(err);
        }
        
        setfetched(!fetched);
      }
      fetchData();
    }, [count]);
    useEffect(() => {
      setfollowerusername([])
      async function fetchData1() {
        setnumber(followersemail.length)
        setnumber1(followingemail.length)
        if (followersemail) {
          console.log(followersemail);
          const res2 = await Promise.all(
            followersemail.map(async (f) => {
              const res3 = await axios.post(
                "http://localhost:5000/getusername",
                {
                  email: f,
                }
              );
              try {
                console.log(res3);
                const abcd = followerusername;
                setfollowerusername((abcd) => [...abcd, res3.data]);
              } catch (err) {
                console.log(err);
              }
            })
          );
          console.log(res2);
          // setfollowerusername(res2);
          setload(true);
        }
      }
      fetchData1();
    }, [fetched]);

    const deleteitem = (deleteuserid) => {
      console.log("hiii");
      console.log(followingemail[deleteuserid]);
      const email = props.email;
      const email1 = followingemail[deleteuserid];

      axios
        .post("http://localhost:5000/delete", {
          email,
          email1,
        })
        .then((response) => {
          // setResponse(response.data)
          console.log(response?.data);
          console.log("yayyyyyy");
          // props.onFormSwitch("Login");
          // navigate("/Profile_page");
          // setalert("aaa");
          // setfetched(false)
          delete followingusername[deleteuserid];
          navigate("/Profile_page");
        })
        .catch(function (error) {
          console.log(error);
        });
      // <Sidebar/>
      // try{
      //   console.log(res)
      //   // setfetched(false)
      // }
      // catch(err)
      // {
      //   console.log(err)
      // }
    };
    const deleteitem1 = (deleteuserid) => {
      console.log("hiii");
      console.log(followersemail[deleteuserid]);
      const email1 = props.email;
      const email = followersemail[deleteuserid];

      axios
        .post("http://localhost:5000/delete", {
          email1,
          email,
        })
        .then((response) => {
          // setResponse(response.data)
          console.log(response?.data);
          console.log("yayyyyyy1");
          // props.onFormSwitch("Login");
          // navigate("/Profile_page");
          // setalert("aaa");
          // setfetched(false)
          delete followerusername[deleteuserid];
          navigate("/Profile_page");
        })
        .catch(function (error) {
          console.log(error);
        });
      // try{
      //   console.log(res)
      //   // setfetched(false)
      // }
      // catch(err)
      // {
      //   console.log(err)
      // }
    };
    useEffect(() => {
      setfollowingusername([])
      async function fetchData1() {
        console.log(fetched);
        if (followingemail) {
          console.log(followingemail);
          const res2 = await Promise.all(
            followingemail.map(async (f) => {
              const res3 = await axios.post(
                "http://localhost:5000/getusername",
                {
                  email: f,
                }
              );
              try {
                if (res3.data) {
                  console.log(res3);
                  const abc = followingusername;
                  setfollowingusername((abc) => [...abc, res3.data]);
                }
              } catch (err) {
                console.log(err);
              }
            })
          );
          console.log(res2);
          // setfollowerusername(res2);
          setload(true);
        }
      }
      fetchData1();
    }, [fetched]);
    // useEffect(() => {}, [props.followingusername]);
    return load ? (
      <>
        <h3 className="rightbarTitle">
          <b>
            <u>User information</u>
          </b>
        </h3>
        <form className="rightbarInfo" onSubmit={updatedb}>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Username:</span>
            {/* {console.log(props.username)} */}
            <input
              type="text"
              defaultValue={props.username}
              className="rightbarInfoValue"
              name="username"
              value={Person_update.username}
              onChange={(e) => onChangeHandler(e.target)}
            />
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Email:</span>
            {/* <input
              type="text"
              className="rightbarInfoValue"
              defaultValue={props.email}
              /> */}
            <span className="rightbarInfoValue">{props.email}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Contact:</span>
            <input
              type="text"
              className="rightbarInfoValue"
              name="contact"
              defaultValue={props.contact}
              value={Person_update.contact}
              onChange={(e) => onChangeHandler(e.target)}
            />
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Age:</span>
            <input
              type="text"
              className="rightbarInfoValue"
              name="age"
              defaultValue={props.age}
              value={Person_update.age}
              onChange={(e) => onChangeHandler(e.target)}
            />
          </div>
          <input type="submit" className="submit" value="Update & Save" />
        </form>
        <hr />
        <h4 className="rightbarTitle">
          {" "}
          <u>
            {" "}
            <b>
              {" "}
              <button
                className="getfollowers"
                // {var number = followersemail.length}
                onClick={() => {
                  setopen(!open);
                  //  number = followersemail.length;
                  open
                  ? (document.getElementById("followersdiv").style.display =
                  "none")
                  : (document.getElementById("followersdiv").style.display =
                  "block");
                  setcount(!count)
                  // navigate("/Profile_page")
                }}
              >
                Followers {number}
              </button>
            </b>
          </u>
        </h4>
        <div className="rightbarFollowings">
          <div className="followers" id="followersdiv">
            <ul>
              {followerusername.map((f, i) => (
                <span className="cancelspan" key={i}>
                  {f}
                  <CancelIcon
                    className="cancel"
                    onClick={() => deleteitem1(i)}
                  ></CancelIcon>
                </span>
              ))}
            </ul>
          </div>
        </div>
        <h4 className="rightbarTitle">
          {" "}
          <u>
            {" "}
            <b>
              <button
                className="getfollowers"
                onClick={() => {
                  setopen(!open);
                  open
                  ? (document.getElementById("followingdiv").style.display =
                  "none")
                  : (document.getElementById("followingdiv").style.display =
                  "block");
                  // navigate("/Profile_page")
                  setcount(!count)
                  }}
                  >
                Following {number1}
              </button>
            </b>
          </u>
        </h4>
        <div className="rightbarFollowings">
          <div className="followers" id="followingdiv">
            <ul>
              {/* {
                followingusername.map((f) => (
                  <br />
                  <div key={f}>{f}</div>
                ))} */}
              {followingusername.map((f, i) => (
                <span className="cancelspan" key={i}>
                  {f}
                  <CancelIcon
                    className="cancel"
                    onClick={() => deleteitem(i, 1)}
                    ></CancelIcon>
                </span>
              ))}
            </ul>
          </div>
        </div>
      </>
    ) : (
      <p>loading</p>
      );
    };
    return (
      <div className="rightbar">
      <div className="rightbarWrapper">
        {props.profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
})
export default  Rightbar;