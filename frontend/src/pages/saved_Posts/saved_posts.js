import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Post from "../../components/post/Post";
import { CircularProgress } from "@mui/material";
import SavedPost from "./show_savedposts";
export default function Savedposts(props) {
  // const [followerusername, setfollowerusername] = useState([]);
  // const [followingusername, setfollowingusername] = useState([]);
  // const [fetched, setfetched] = useState(false);
  const [posts, setposts] = useState([]);
  const [done, setdone] = useState(false);
  const [username, setusername] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    const Email = localStorage.getItem("hello");
    console.log(Email);
    axios
      .post("http://localhost:5000/getusername", {
        email: Email,
        store: localStorage.getItem("token"),q:localStorage.getItem("hello"),
      })
      .then((response) => {
        if (response.data.message === 0) {
          alert("wrong user");
          navigate("/");
          console.log("wrong");
        }
        console.log(response.data);
        // console.log(response.data);
        // setfirst_name(response?.data?.first_name);
        // setsecond_name(response?.data?.second_name);
        // setage(response?.data?.age);
        // setemail(response?.data?.email);
        // setusername(response?.data?.username);
        // setcontact(response?.data?.contact);
        if (!username) setusername(response.data);
        console.log(username);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .post("http://localhost:5000/all_savedposts", {
        store: localStorage.getItem("token"),q:localStorage.getItem("hello"),
      })
      .then((response) => {
        if (response.data.message === 0) {
          alert("wrong user");
          navigate("/");
          console.log("wrong");
        }
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

  function deletepost(index) {
    const id1 = posts[index].id1;
    axios
      .post("http://localhost:5000/deletepost", {
        id1: id1,
        store: localStorage.getItem("token"),q:localStorage.getItem("hello"),
      })
      .then((response) => {
        if (response.data.message === 0) {
          alert("wrong user");
          navigate("/");
          console.log("wrong");
        }
        console.log(response);
        delete posts[index];
        navigate("/saved_posts");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return done ? (
    // <>
    //   <div>
    //   <Topbar />
    //     <div className="profile">
    //   <p>Saved Posts</p>
    //   <div className="profileRight">
    //     <div className="profileRightBottom">
    //       {posts.map((p) => {
    //         return (
    //           <div className="allposts" key={p.id}>
    //             <p>Posted by -:{p.username}</p>
    //             <p>Topic -:{p.topic}</p>
    //             <p>Content -:{p.content}</p>
    //             {/* <button onClick={()=>upvote()}>upvote {upvotes}</button>
    //               <button onClick={()=>downvote()}>downvote {downvotes}</button> */}
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>
    //     </div>
    //   </div>
    // </>
    <>
      <Topbar />
      <div>
        <h2 style={{textAlign:"center"}}>
          <b>
            <u>Saved Posts</u>
          </b>
        </h2>
        <div>
          <div style={{width:"80%",margin:"auto"}}>
            {posts.map((p) => {
              //   return (
              //     <div className="allposts" key={p.id}>
              //       <p>Posted by -:{p.username}</p>
              //       <p>Topic -:{p.topic}</p>
              //       <p>Content -:{p.content}</p>
              //       <button onClick={()=>deletepost(p.id)}>delete</button>
              //       {/* <button onClick={()=>upvote()}>upvote {upvotes}</button>
              //           <button onClick={()=>downvote()}>downvote {downvotes}</button> */}
              //     </div>
              //   );
              return (
                <SavedPost
                  key={p.id}
                  post={p}
                  username={username}
                  array={p?.upvoteusernames}
                  array1={p?.downvoteusernames}
                />
              );
            })}
          </div>
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
}
