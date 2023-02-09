import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";
import "./subdetails.css";
import Feed from "../../components/feed/Feed";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Popup from "reactjs-popup";
const Subdetails = () => {
  const { name } = useParams();
  const [subgdata, setsubgdata] = useState({});
  const [done, setdone] = useState(false);
  const [done1, setdone1] = useState(false);
  const [view, setview] = useState(0);
  const [username, setusername] = useState(null);
  const [follows, setfollows] = useState(0);
  const [change, setchange] = useState(false);
  const [change1, setchange1] = useState(0);
  const [change2, setchange2] = useState(false);
  const [topic, settopic] = useState(null);
  const [posts, setposts] = useState([]);
  const [modemail, setmodemail] = useState([]);
  let navigate = useNavigate();
  function button_(index) {
    setview(index);
    navigate(`/subgreddiit/${name}`);
    // window.location.reload();
  }
  const [followersarray, setfollowersarray] = useState([]);
  useEffect(() => {
    console.log("2");
    const email = localStorage.getItem("hello");
    axios
      .post("http://localhost:5000/getusername", { email: email })
      .then((response) => {
        setusername(response.data);
        setchange1(change1 + 1);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [change]);
  useEffect(() => {
    if (username && change1) {
      console.log("3");
      axios
        .post("http://localhost:5000/findsub", { Name: name })
        .then((response) => {
          console.log(response);
          // setResponse(response.data)
          // console.log(response);
          // props.onFormSwitch("Login");
          // naviagte("/");
          // for (let i = 0; i < response?.data?.length; i++) {
          //   // if (arr[0] === 0) {
          //   // if (users.length >= response.data?.length) {
          //   //   continue;
          //   // }
          //   // console.log(response?.data[i]?.email);
          //   // if (response?.data[i]?.email === email) {
          //   //   console.log("qwerty");
          //   //   k = 1;
          //   //   continue;
          //   // }
          var temp = {
            no_of_followers: response?.data?.no_of_followers,
            no_of_posts: response?.data?.no_of_posts,
            moderator: response?.data?.moderator,
            followers: response?.data?.followers,
            blocked: response?.data?.blocked,
            left: response?.data?.left,
            request: response?.data?.request,
            Name: response?.data?.Name,
            description: response?.data?.description,
            tags: response?.data?.tags,
            banned_keywords: response?.data?.banned_keywords,
          };
          // }
          // }
          if (temp?.followers?.includes(username)) {
            setfollows(1);
            console.log("hii there");
          } else if (temp?.request?.includes(username)) {
            setfollows(2);
          }
          setfollowersarray(temp.followers);
          setsubgdata(temp);
          console.log("bsdk1 : ", temp);
          // setdone(true);
          // setchange2(!change2)
          setdone1(true);
        })
        .catch(function (error) {
          console.log(error);
        });

      console.log("findposts");
      axios
        .post("http://localhost:5000/findposts", { Name: name })
        .then((response) => {
          console.log(response);
          // setResponse(response.data)
          // console.log(response);
          // props.onFormSwitch("Login");
          // naviagte("/");
          // if (response.data.message) {
          var temp1 = [];
          console.log(response?.data?.length);
          for (let i = 0; i < response?.data?.length; i++) {
            //   // if (arr[0] === 0) {
            //   // if (users.length >= response.data?.length) {
            //   //   continue;
            //   // }
            //   // console.log(response?.data[i]?.email);
            //   // if (response?.data[i]?.email === email) {
            //   //   console.log("qwerty");
            //   //   k = 1;
            //   //   continue;
            //   // }
            console.log(i);
            temp1.push({
              id: i,
              upvotes: response?.data[i]?.upvotes,
              downvotes: response?.data[i]?.downvotes,
              username: response?.data[i]?.username,
              email: response?.data[i]?.email,
              topic: response?.data[i]?.topic,
              comments: response?.data[i]?.followers,
              Name: response?.data[i]?.Name,
              content: response?.data[i]?.content,
              tags: response?.data[i]?.tags,
              banned_keywords: response?.data[i]?.banned_keywords,
            });
            // }
            // }
            setposts(temp1);
            console.log("bsdk12 : ", temp1);
          }
          // else
          // {
          //   var temp1 = []
          //   temp1.push
          // }
          setdone(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [username, change1]);

  // useEffect(()=>{

  // },[change2])
  const submitform = () => {
    // e.preventDefault();
    // console.log(Description)
    console.log("posts");
    console.log(document.getElementById("Description").value);
    const des = document.getElementById("Description").value;
    const email = localStorage.getItem("hello");
    const banned = subgdata.banned_keywords;
    const tags = subgdata.tags;
    const no_of_posts = subgdata.no_of_posts;
    axios
      .post("http://localhost:5000/posts", {
        name,
        des,
        email,
        username,
        topic,
        banned,
        tags,
        no_of_posts,
      })
      .then((response) => {
        // setResponse(response.data)
        console.log(response);
        setchange1(change1 + 1);
        // navigate("/mysubgreddiit")
        // props.onFormSwitch("Login");
        // naviagte("/");
      })
      .catch(function (error) {
        console.log(error);
      });
    // setadd(!add)
  };

  function addinrequest() {
    // setisclicked(true)
    // const email = localStorage.getItem("hello");
    // const username1 = userdata
    // const name = subgdata[index].Name
    // console.log({userdata,name,index})
    if (subgdata?.left?.includes(username)) {
      console.log("left");
      alert("You left the subgreddiit");
      return;
    }
    axios
      .post("http://localhost:5000/addinrequest", { name, username })
      .then((response) => {
        console.log(response);
        // alert("added");
        // setfollowingusername((followingusername) => [
        //   ...followingusername,
        //   users[index].username,
        // ]);
        // <Navigate to="/"></Navigate>
        // navigate("/home")
        // setisclicked
        // isclicked[index] = "true"
        // console.log(isclicked[index]);
        setfollows(2);
      })
      .catch(function (error) {
        console.log(error);
      });
    // <Rightbar/>
  }

  function accept(index) {
    const username1 = subgdata.request[index];
    axios
      .post("http://localhost:5000/accept", { name, username1 })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    delete subgdata.request[index];
    navigate(`/subgreddiit/${name}`);
  }
  function reject(index) {
    const username1 = subgdata.request[index];
    axios
      .post("http://localhost:5000/reject", { name, username1 })
      .then((response) => {
        console.log("hvfiyah");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    delete subgdata.request[index];
    navigate(`/subgreddiit/${name}`);
  }
  const leave = async () => {
    // const username1 = subgdata.request[index]
    const per = await axios.post("http://localhost:5000/leave", {
      name,
      username,
    });
    try {
      console.log(per);
      setfollows(0);
      setchange1(change1 + 1);
    } catch (error) {
      console.log(error);
    }
    // delete subgdata.request[index]

    // navigate(`/subgreddiit/${name}`);
  };

  return done && done1 ? (
    <>
      {/* {console.log(subgdata.moderator)} */}
      <Topbar />
      {/* <Subsidebar /> */}
      <div style={{ display: "flex" }}>
        <div className="sidebar">
          <div className="sidebarWrapper">
            <ul className="sidebarFriendList">
              <div className="users">
                <button
                  className="sublinks"
                  onClick={() => {
                    button_(1);
                  }}
                >
                  Users
                </button>
              </div>
              {console.log(subgdata.moderator)}
              {subgdata.moderator[0].email === localStorage.getItem("hello") ? (
                <>
                  <div className="users">
                    <button
                      className="sublinks"
                      onClick={() => {
                        button_(2);
                      }}
                    >
                      Joining Requests
                    </button>
                  </div>
                  <div className="users">
                    <button
                      className="sublinks"
                      onClick={() => {
                        button_(4);
                      }}
                    >
                      Reported Posts
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
              <div className="users">
                <button
                  className="sublinks"
                  onClick={() => {
                    button_(3);
                  }}
                >
                  Stats
                </button>
              </div>
              <div className="users">
                <button
                  className="sublinks"
                  onClick={() => {
                    button_(0);
                  }}
                >
                  Posts
                </button>
              </div>
            </ul>
          </div>
        </div>
        <div className="extraview">
          {view === 3 ? (
            <div className="array">
              <p>
                <u>
                  <b>STATS</b>
                </u>
              </p>
            </div>
          ) : view === 2 ? (
            <div className="array">
              <p>
                <u>
                  <b>JOINING REQUESTS</b>
                </u>
              </p>
              {subgdata.request.map((f, i) => {
                return (
                  <span key={i}>
                    {f}
                    <ClearIcon
                      className="cancel"
                      onClick={() => {
                        reject(i);
                      }}
                    ></ClearIcon>
                    <CheckIcon
                      className="cancel"
                      onClick={() => {
                        accept(i);
                      }}
                    ></CheckIcon>
                  </span>
                );
              })}
            </div>
          ) : view === 1 ? (
            // <div className="array">
            <>
              <p>
                <b>
                  <u>USERS</u>
                </b>
              </p>
              <div className="flex">
                <div className="elements">
                  <p>followers</p>
                  {subgdata.followers.map((f) => {
                    return <span>{f}</span>;
                  })}
                </div>
                <div className="elements">
                  <p>blocked</p>
                  {subgdata.blocked.map((f) => {
                    return <span>{f}</span>;
                  })}
                </div>
                <div className="elements">
                  <p>left</p>
                  {subgdata.left.map((f) => {
                    return <span>{f}</span>;
                  })}
                </div>
              </div>
              {/* </div> */}
            </>
          ) : view === 4 ? (
            <div className="array">
              <p>
                <b>
                  <u>Reported Posts</u>
                </b>
              </p>
              {/* {subgdata.followers.map((f) => {
              return <span>{f}</span>;
            })} */}
            </div>
          ) : (
            <>
              {follows === 0 ? (
                <button onClick={() => addinrequest()}>Follow</button>
              ) : follows === 1 &&
                subgdata.moderator.email === localStorage.getItem("hello") ? (
                <>
                  <p>following</p>
                  <button>Add Posts</button>
                </>
              ) : follows === 2 ? (
                <p>requested</p>
              ) : follows === 1 &&
                subgdata.moderator.email !== localStorage.getItem("hello") ? (
                <>
                  <p>following</p>
                  <button onClick={() => leave()}>Leave</button>
                  <div className="profileInfo">
                    <Popup
                      trigger={
                        <button className="profileInfoName">
                          Create Posts
                        </button>
                      }
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
                              placeholder="Topic"
                              className="subform"
                              value={topic}
                              onChange={(e) => {
                                settopic(e.target.value);
                              }}
                            />
                            <textarea
                              name="Description"
                              id="Description"
                              cols="30"
                              rows="5"
                              placeholder="Content"
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
                  </div>
                </>
              ) : (
                <></>
              )}
              <div className="posts">
                <p style={{ textAlign: "center", fontSize: "20px" }}>
                  <b>
                    <u>Posts</u>
                  </b>
                </p>
                <div className="flex1">
                  {posts.map((p) => {
                    return (
                      <div className="allposts" key={p.id}>
                        <p>Posted by -:{p.username}</p>
                        <p>Topic -:{p.topic}</p>
                        <p>Content -:{p.content}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  ) : (
    <p>loading</p>
  );
};

export default Subdetails;
