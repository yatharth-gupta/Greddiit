import "./post.css";
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
export default function Post({ post, username, array, array1 }) {
  const [upvotes, setupvotes] = useState(post.upvotes);
  const [isupvotesd, setIsupvotesd] = useState(!array.includes(username));

  console.log(array);
  const upvotesHandler = () => {
    const name = post.id1;
    console.log(isupvotesd);
    if (isupvotesd) {
      var up = 0;
      if (!array.includes(username)) {
        console.log("hi");
        up = upvotes + 1;
        setupvotes(up);
        axios
          .post("http://localhost:5000/upvote1", {
            name,
            up,
            username,
            store: localStorage.getItem("token"),q:localStorage.getItem("hello"),
          })
          .then((response) => {
            if (response.data.message === 0) {
              alert("wrong user");
              navigate("/");
              console.log("wrong");
            }
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } else {
      console.log("hi11");
      const up = upvotes - 1;
      setupvotes(up);
      axios
        .post("http://localhost:5000/upvote", {
          name,
          up,
          username,
          store: localStorage.getItem("token"),q:localStorage.getItem("hello"),
        })
        .then((response) => {
          if (response.data.message === 0) {
            alert("wrong user");
            navigate("/");
            console.log("wrong");
          }
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      if (array.indexOf(username) !== -1)
        array.splice(array.indexOf(username), 1);
      console.log(array);
    }
    setIsupvotesd(!isupvotesd);
  };
  const [downvotes, setdownvotes] = useState(post.downvotes);
  const [isdownvotesd, setIsdownvotesd] = useState(!array1.includes(username));

  let navigate = useNavigate();
  const downvotesHandler = () => {
    console.log(array1);
    const name = post.id1;
    console.log(isdownvotesd);
    if (isdownvotesd) {
      if (!array1.includes(username)) {
        console.log("hi");
        const down = downvotes + 1;
        setdownvotes(down);
        axios
          .post("http://localhost:5000/downvote1", {
            name,
            down,
            username,
            store: localStorage.getItem("token"),q:localStorage.getItem("hello"),
          })
          .then((response) => {
            if (response.data.message === 0) {
              alert("wrong user");
              navigate("/");
              console.log("wrong");
            }
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } else {
      console.log("hi11");
      const down = downvotes - 1;
      setdownvotes(down);
      axios
        .post("http://localhost:5000/downvote", {
          name,
          down,
          username,
          store: localStorage.getItem("token"),q:localStorage.getItem("hello"),
        })
        .then((response) => {
          if (response.data.message === 0) {
            alert("wrong user");
            navigate("/");
            console.log("wrong");
          }
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      if (array1.indexOf(username) !== -1)
        array1.splice(array1.indexOf(username), 1);
      console.log(array1);
    }
    setIsdownvotesd(!isdownvotesd);
  };

  const [comments, setcomments] = useState([{}]);
  const [following, setfollowing] = useState([]);
  const [gotcomments, setgotcomments] = useState(false);
  const [concern, setconcern] = useState("");
  const [reportedtext, setreportedtext] = useState("");
  const [no_of_comments, setno_of_comments] = useState(post?.comments?.length);
  const showcomments = () => {
    const name = post.id1;
    console.log("hii2");
    axios
      .post("http://localhost:5000/showcomments", {
        Name: name,
        store: localStorage.getItem("token"),q:localStorage.getItem("hello"),
      })
      .then((response) => {
        if (response.data.message === 0) {
          alert("wrong user");
          navigate("/");
          console.log("wrong");
        }
        console.log(response);
        var temp1 = [];
        console.log(response?.data?.length);
        for (let i = 0; i < response?.data?.length; i++) {
          console.log(i);
          temp1.push({
            id: i,
            id1: response?.data[i]?._id,
            parent:name,
            username: response?.data[i]?.username,
            text: response?.data[i]?.text,
            childids:response?.data[i]?.childids,
          });
        }
        setcomments(temp1);
        console.log("bsdk123 : ", temp1);
      })
      .catch(function (error) {
        console.log(error);
      });
    setgotcomments(true);
  };

  function inc_report() {
    axios
      .post("http://localhost:5000/inc_report", {
        Name: post.Name,
        store: localStorage.getItem("token"),q:localStorage.getItem("hello"),
      })
      .then((response) => {
        if (response.data.message === 0) {
          alert("wrong user");
          navigate("/");
          console.log("wrong");
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const addcomment = () => {
    const name = post.id1;
    const Name = post.Name;

    axios
      .post("http://localhost:5000/addcomment", {
        name,
        text,
        username,
        store: localStorage.getItem("token"),q:localStorage.getItem("hello"),
      })
      .then((response) => {
        if (response.data.message === 0) {
          alert("wrong user");
          navigate("/");
          console.log("wrong");
        }
        console.log(response);
        var comm = [...comments]
        comm.push({ text, username });
        setcomments(comm)
        console.log("hii3");
        setno_of_comments(no_of_comments + 1);
        // navigate(`/subgreddiit/${Name}/posts`);
      })
      .catch(function (error) {
        console.log(error);
      });
    // setgotcomments(true);
  };

  const savepost = () => {
    axios
      .post("http://localhost:5000/savepost", {post:post,store: localStorage.getItem("token"),q:localStorage.getItem("hello")})
      .then((response) => {
        console.log(response);
        alert("saved");
      })
      .catch(function (error) {
        console.log(error);
      });
    // setgotcomments(true);
  };

  const reportpost = () => {
    console.log(username);
    const postid = post.id1;
    axios
      .post("http://localhost:5000/reportpost", {
        post,
        concern,
        reportedtext,
        username,
        postid,
        store: localStorage.getItem("token"),q:localStorage.getItem("hello"),
      })
      .then((response) => {
        if (response.data.message === 0) {
          alert("wrong user");
          navigate("/");
          console.log("wrong");
        }
        console.log(response);
        alert("reported");
      })
      .catch(function (error) {
        console.log(error);
      });
    // setgotcomments(true);
  };
  const [text, settext] = useState(null);
  const [change, setchange] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("hello");
    axios
      .post("http://localhost:5000/getfollowing", {
        email: email,
        store: localStorage.getItem("token"),q:localStorage.getItem("hello"),
      })
      .then((response) => {
        if (response.data.message === 0) {
          alert("wrong user");
          navigate("/");
          console.log("wrong");
        }
        console.log(response);
        setfollowing(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [change]);
  const addfollow = async () => {
    // setchange(!change)
    if (following.includes(post.email)) {
      alert("already following");
      return;
    }
    const email = localStorage.getItem("hello");
    const second = post.email;
    const Name = post.Name;
    const per = await axios.post("http://localhost:5000/addinfollowing", {
      email,
      email1: second,
      store: localStorage.getItem("token"),q:localStorage.getItem("hello"),
    });
    try {
      if (per.data.message === 0) {
        alert("wrong user");
        navigate("/");
        console.log("wrong");
      }
      setchange(!change);
      // navigate(`/subgreddiit/${Name}/`);
      window.location.reload();
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          {/* <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              alt=""
            />
            <span className="postUsername">
              {Users.filter((u) => u.id === post?.userId)[0].username}
            </span>
            <span className="postDate">{post.date}</span>
          </div> */}
          <div className="postTopRight">
            <span>
              {/* <MoreVert /> */}
              <b>Posted by -:</b> {post.username}
            </span>
            <span style={{ float: "right", marginTop: "-13px" }}>
              {/* <span style={{}}> */}
              <span>
                {following.includes(post.email) ||
                post.email === localStorage.getItem("hello") ? (
                  <span>following</span>
                ) : (
                  <>
                    <button
                      className="follow"
                      style={{ marginRight: "10px" }}
                      onClick={() => {
                        addfollow();
                      }}
                    >
                      Follow
                    </button>
                  </>
                )}
                {post.email !== localStorage.getItem("hello") ? (
                  <Popup
                    trigger={
                      // <span style={{marginBottom:"-10px"}}>

                      <ReportIcon
                        fontSize="large"
                        style={{ marginBottom: "-13px" }}
                      />
                      // </span>
                    }
                    modal
                    nested
                  >
                    {(close) => (
                      <>
                        <form className="modal">
                          <input
                            type="text"
                            required
                            placeholder="concern"
                            value={concern}
                            onChange={(e) => {
                              setconcern(e.target.value);
                            }}
                          ></input>
                          <input
                            type="text"
                            required
                            placeholder="text"
                            value={reportedtext}
                            onChange={(e) => {
                              setreportedtext(e.target.value);
                            }}
                          ></input>
                          {/* <textarea
                      name="Description"
                      id="Description"
                      cols="30"
                      rows="5"
                      placeholder="Content"
                    ></textarea> */}
                        </form>
                        <div className="profileInfoName">
                          <button
                            className="formsubmit"
                            disabled={!reportedtext||!concern}
                            onClick={() => {
                              reportpost();
                              inc_report();
                              close();
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      </>
                    )}
                  </Popup>
                ) : (
                  <></>
                )}
              </span>
              <span>
                <SaveAltIcon
                  fontSize="large"
                  style={{ marginBottom: "-13px", marginLeft: "-10px" }}
                  onClick={() => savepost()}
                />
                {/* <button onClick={() => savepost()}>save</button> */}
              </span>
            </span>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.content}</span>
          {/* <img className="postImg" src={post.photo} alt="" /> */}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <ThumbUpIcon onClick={upvotesHandler} />
            {/* <img className="likeIcon" src="assets/like.png" onClick={upvotesHandler} alt="" />
            <img className="likeIcon" src="assets/heart.png" onClick={upvotesHandler} alt="" /> */}
            <span className="postLikeCounter">{upvotes} people upvotes it</span>
            <ThumbDownIcon onClick={downvotesHandler} />
            <span className="postLikeCounter">
              {downvotes} people downvotes it
            </span>
          </div>
          <div className="postBottomRight">
            <span
              className="postCommentText"
              onClick={() => {
                showcomments();
              }}
            >
              {no_of_comments} comments
            </span>
            {gotcomments ? (
              <div>
                {comments.map((c) => {
                  return (
                    <div key={c}>
                      {/* <p>commented by -: {c.username}</p> */}
                      <p>Comment -: {c.text}</p>
                    </div>
                  );
                })}
                <Popup
                  trigger={
                    <button className="profileInfoName">Add comment</button>
                  }
                  modal
                  nested
                >
                  {(close) => (
                    <>
                      <p style={{ textAlign: "center", fontSize: "30px" }}>
                        {" "}
                        <u> Comment</u>
                      </p>
                      <form className="modal">
                        <input
                          type="text"
                          required
                          placeholder="comment"
                          value={text}
                          onChange={(e) => {
                            settext(e.target.value);
                          }}
                        ></input>
                        {/* <textarea
                      name="Description"
                      id="Description"
                      cols="30"
                      rows="5"
                      placeholder="Content"
                    ></textarea> */}
                      </form>
                      <div className="profileInfoName">
                        <button
                          className="formsubmit"
                          disabled={!text}
                          onClick={() => {
                            close();
                            addcomment();
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
          </div>
        </div>
      </div>
    </div>
  );
}
