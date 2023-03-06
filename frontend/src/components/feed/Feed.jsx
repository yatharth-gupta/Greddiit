import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Feed() {
  const [done, setdone] = useState(0);
  const [username, setusername] = useState(null);
  const [posts, setposts] = useState([]);
  let navigate = useNavigate();
  // useEffect(() => {
  //   console.log("2");
  //   const email = localStorage.getItem("hello");
  //   axios
  //     .post("http://localhost:5000/getusername", {
  //       email: email,
  //       store: localStorage.getItem("token"),q:localStorage.getItem("hello"),
  //     })
  //     .then((response) => {
  //       if (response.data.message === 0) {
  //         alert("wrong user");
  //         navigate("/");
  //         console.log("wrong");
  //       }
  //       setusername(response.data);
  //       setchange1(change1 + 1);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);
  useEffect(() => {
    const email = localStorage.getItem("hello");

    axios
      .post("http://localhost:5000/findmyposts", {
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
            upvoteusernames: response?.data[i]?.upvoteusernames,
            downvoteusernames: response?.data[i]?.downvoteusernames,
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
  }, []);
  return done ? (
    posts.length?(
      <>
    <div className="feed">
      <h2 style={{margin:"0px",textAlign:"center"}}>My Posts</h2>
      <div className="feedWrapper">
        {/* <Share /> */}
        {posts.map((p) => (
          <Post
            key={p.id}
            post={p}
            username={username}
            array={p?.upvoteusernames}
            array1={p?.downvoteusernames}
          />
        ))}
      </div>
    </div>
    </>):(<h2>No Posts Yet</h2>)
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
  );
}
