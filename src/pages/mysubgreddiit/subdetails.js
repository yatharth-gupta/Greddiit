import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";
import "./subdetails.css";
import Feed from "../../components/feed/Feed";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Popup from "reactjs-popup";
import Post from "../../components/post/Post";
import { CircularProgress } from "@mui/material";

// import LoadingButton from '@mui/lab/LoadingButton';
// or
import { LoadingButton } from "@mui/lab";
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
  // const [up, setup] = useState(0);
  const [down, setdown] = useState(0);
  const [votes, setvotes] = useState(0);
  const [repoposts, setrepoposts] = useState([]);
  const [isignored, setisignored] = useState(false);

  const [bannedstring, setbannedstring] = useState("");
  const [tagsstring, settagsstring] = useState("");
  let des1 = "";
  let tagwords = [];
  // const [up,setup] = useState(post.like)
  // const [isup,setIsup] = useState(false)

  // const upHandler =()=>{
  //   setup(isup ? up-1 : up+1)
  //   setIsupd(!isup)
  // }

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
      var temp = {};
      var message = 0;
      axios
        .post("http://localhost:5000/findsub", { Name: name })
        .then((response) => {
          console.log(response);
          temp = {
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
        // if (temp?.moderator[0]?.email !== localStorage.getItem("hello"))
            message = 1;
      // if (temp?.moderator[0]?.email !== localStorage.getItem("hello"))
      console.log("findposts");
      axios
        .post("http://localhost:5000/findposts", {
          Name: name,
          message: message,
        })
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
            console.log(i);
            temp1.push({
              id: i,
              id1: response?.data[i]?._id,
              postid: response?.data[i]?.postid,
              upvotes: response?.data[i]?.upvotes,
              downvotes: response?.data[i]?.downvotes,
              username: response?.data[i]?.username,
              email: response?.data[i]?.email,
              topic: response?.data[i]?.topic,
              comments: response?.data[i]?.comments,
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

      axios
        .post("http://localhost:5000/all_reportedposts")
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
            console.log(i);
            temp1.push({
              id: i,
              id1: response?.data[i]?._id,
              postid: response?.data[i]?.postid,
              upvotes: response?.data[i]?.upvotes,
              downvotes: response?.data[i]?.downvotes,
              username: response?.data[i]?.username,
              email: response?.data[i]?.email,
              topic: response?.data[i]?.topic,
              comments: response?.data[i]?.comments,
              Name: response?.data[i]?.Name,
              content: response?.data[i]?.content,
              tags: response?.data[i]?.tags,
              banned_keywords: response?.data[i]?.banned_keywords,
              concern: response?.data[i]?.concern,
              reportedtext: response?.data[i]?.reportedtext,
              reportedby: response?.data[i]?.reportedby,
            });
            // }
            // }
            setrepoposts(temp1);
            console.log("bsdk12 : ", temp1);
          }
          // else
          // {
          //   var temp1 = []
          //   temp1.push
          // }
          // setdone(true);
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
    // console.log(document.getElementById("Description").value);
    // const des = document.getElementById("Description").value;
    const email = localStorage.getItem("hello");
    const banned = subgdata.banned_keywords;
    const tags = subgdata.tags;
    const no_of_posts = subgdata.no_of_posts;
    axios
      .post("http://localhost:5000/posts", {
        name,
        des1,
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
        // navigate(`/subgreddiit/${name}`)
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
    // tagwords = tagsstring.split(",");
    const bannedwords = subgdata.banned_keywords.split(",");
    // const bannedwords = bannedstring.split(",")
    // setdes(document.getElementById("Description").value);
    des1 = document.getElementById("Description").value;
    var des = document.getElementById("Description").value;

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
    if (des1 !== des) {
      alert("your post contains banned keywords");
    }
    submitform();
    // console.log(name);
    // console.log(document.getElementById("Description").value);
  };

  function deletepost(index) {
    const id1 = repoposts[index]?.postid;
    const id2 = repoposts[index]?.id1;
    console.log(id1)
    axios
      .post("http://localhost:5000/deletepostpermanent", { id1,id2 })
      .then((response) => {
        console.log(response);
        delete repoposts[index];
        navigate(`/subgreddiit/${name}`);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    function blockuser(index) {
      const username = repoposts[index].username;
      const id2 = repoposts[index]?.id1;
      axios
      .post("http://localhost:5000/blockuser", { name, username,id2 })
      .then((response) => {
        console.log(response);
        delete repoposts[index];
        navigate(`/subgreddiit/${name}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // function ignore(index) {
  //   const username = repoposts[index].username;
  //   axios
  //     .post("http://localhost:5000/ignore", { name,username })
  //     .then((response) => {
  //       console.log(response);
  //       // delete repoposts[index];
  //       navigate(`/subgreddiit/${name}`);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

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

  function upvote() {
    const up = subgdata.upvotes;
    axios
      .post("http://localhost:5000/upvote", { name, up })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setvotes(votes + 1);
  }
  function downvote() {
    const down = subgdata.downvotes;
    axios
      .post("http://localhost:5000/downvote", { name, down })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setvotes(votes - 1);
  }

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
        <div className="details1">
          <div className="img2">
            <img
              className="img1"
              src="https://source.unsplash.com/random/200x200?sig=1"
              alt="image"
            />
            <h2>{name}</h2>
          </div>
          <div className="subdetails">
            <p>
              <span style={{ float: "left" }}>
                {/* {console.log(subgdata.moderator[0].username)} */}
                <b>Created by - {subgdata.moderator[0].username}</b>
              </span>
              <span style={{ float: "right" }}>
                {console.log()}
                {follows === 0 ? (
                  <button onClick={() => addinrequest()}>Follow</button>
                ) : follows === 1 &&
                  subgdata.moderator[0].email ===
                    localStorage.getItem("hello") ? (
                  <p>following</p>
                ) : follows === 2 ? (
                  <p>requested</p>
                ) : follows === 1 &&
                  subgdata.moderator[0].email !==
                    localStorage.getItem("hello") ? (
                  <>
                    <span>following</span>
                    <button onClick={() => leave()}>Leave</button>
                  </>
                ) : (
                  <></>
                )}
              </span>
            </p>
            <p>Description</p>
            <div className="des">{subgdata.description}</div>
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
              {/* <div style={{width:"100%",alignItems:"center"}}> */}
              {repoposts.map((p) => {
                return (
                  <div className="allposts" key={p.id}>
                    {console.log(p?.reportedby)}
                    <p>Reported by -:{p?.reportedby}</p>
                    <p>Posted by -:{p?.username}</p>
                    <p>Concern -:{p.concern}</p>
                    <p>Reportedtext -:{p.reportedtext}</p>
                    {/* <button onClick={()=>upvote()}>upvote {upvotes}</button>
                        <button onClick={()=>downvote()}>downvote {downvotes}</button> */}
                    <Popup
                      trigger={
                        <button className="profileInfoName">show Post</button>
                      }
                      modal
                      nested
                    >
                      {(close) => (
                        <>
                          <p style={{ textAlign: "center", fontSize: "30px" }}>
                            {" "}
                            <u> Post</u>
                          </p>
                          <form className="modal">
                            <input
                              type="text"
                              required={true}
                              placeholder="Topic"
                              value={p.topic}
                              className="subform"
                              disabled="true"
                            />
                            <textarea
                              name="Description"
                              id="Description"
                              cols="30"
                              rows="5"
                              placeholder="Content"
                              value={p.content}
                              disabled="true"
                            ></textarea>
                          </form>
                          <div className="profileInfoName">
                            <button
                              className="formsubmit"
                              onClick={() => {
                                close();
                              }}
                            >
                              Close
                            </button>
                          </div>
                        </>
                      )}
                    </Popup>
                    <button onClick={() => deletepost(p.id)}>delete</button>
                    <button onClick={() => blockuser(p.id)}>block user</button>
                    {/* <button onClick={()=>ignore(p.id)}>ignore</button> */}
                  </div>
                );
                //   return <Post key={p.id} post={p} username={username} />;
              })}
            </div>
          ) : (
            // </div>
            <>
              {subgdata.moderator.email !== localStorage.getItem("hello") ? (
                <div className="profileInfo">
                  <Popup
                    trigger={
                      <button className="profileInfoName">Create Posts</button>
                    }
                    modal
                    nested
                  >
                    {(close) => (
                      <>
                        <p style={{ textAlign: "center", fontSize: "30px" }}>
                          {" "}
                          <u> Create new Post</u>
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
                              findbannedwords();
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
                    // return (
                    //   <div className="allposts" key={p.id}>
                    //     <p>Posted by -:{p.username}</p>
                    //     <p>Topic -:{p.topic}</p>
                    //     <p>Content -:{p.content}</p>
                    //     <button onClick={()=>upvote()}>upvote {upvotes}</button>
                    //     <button onClick={()=>downvote()}>downvote {downvotes}</button>
                    //   </div>
                    // );
                    return <Post key={p.id} post={p} username={username} />;
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  ) : (
    // <p>loading</p>
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
};

export default Subdetails;
