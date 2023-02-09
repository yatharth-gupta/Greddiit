import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { Users } from "../../dummyData";
import { useState } from "react";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";

export default function Post({ post, username }) {
  const [upvotes, setupvotes] = useState(post.upvotes);
  const [isupvotesd, setIsupvotesd] = useState(false);

  const upvotesHandler = () => {
    setupvotes(isupvotesd ? upvotes - 1 : upvotes + 1);
    setIsupvotesd(!isupvotesd);
    const name = post.id1;
    const up = upvotes;
    axios
      .post("http://localhost:5000/upvote", { name, up })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [downvotes, setdownvotes] = useState(post.downvotes);
  const [isdownvotesd, setIsdownvotesd] = useState(false);

  let navigate = useNavigate();
  const downvotesHandler = () => {
    setdownvotes(isdownvotesd ? downvotes - 1 : downvotes + 1);
    setIsdownvotesd(!isdownvotesd);
    const name = post.id1;
    const down = downvotes;
    console.log("hii1");
    axios
      .post("http://localhost:5000/downvote", { name, down })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [comments, setcomments] = useState([{}]);
  const [gotcomments, setgotcomments] = useState(false);
  const [no_of_comments, setno_of_comments] = useState(post?.comments?.length);
  const showcomments = () => {
    const name = post.id1;
    console.log("hii2");
    axios
      .post("http://localhost:5000/showcomments", { Name: name })
      .then((response) => {
        console.log(response);
        var temp1 = [];
        console.log(response?.data?.length);
        for (let i = 0; i < response?.data?.length; i++) {
          console.log(i);
          temp1.push({
            id: i,
            id1: response?.data[i]?._id,
            username: response?.data[i]?.username,
            text: response?.data[i]?.text,
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

  const addcomment = () => {
    const name = post.id1;
    const Name = post.Name;

    axios
      .post("http://localhost:5000/addcomment", { name, text, username })
      .then((response) => {
        console.log(response);
        comments.push({ text, username });
        console.log("hii3");
        setno_of_comments(no_of_comments + 1);
        navigate(`/subgreddiit/${Name}`);
      })
      .catch(function (error) {
        console.log(error);
      });
    // setgotcomments(true);
  };

  const savepost = () => {
    axios
      .post("http://localhost:5000/savepost", post)
      .then((response) => {
        console.log(response);
        alert("saved");
      })
      .catch(function (error) {
        console.log(error);
      });
    // setgotcomments(true);
  };
  const [text, settext] = useState(null);
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
              <MoreVert />
            </span>
            <span>
              <button onClick={() => savepost()}>save</button>
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
                      <p>commented by -: {c.username}</p>
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
