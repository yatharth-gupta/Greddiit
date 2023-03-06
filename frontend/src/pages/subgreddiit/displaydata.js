import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import axios from "axios";
const Displaydata = ({ s, username }) => {
  const [follows, setfollows] = useState(0);
  const [done,setdone] = useState(0);
  useEffect(() => {
    setfollows(s.join);
    setdone(true)
  }, []);
  let navigate = useNavigate();
  function addinrequest() {
    // setisclicked(true)
    // const email = localStorage.getItem("hello");
    // const username1 = userdata
    // const name = subgdata[index].Name
    // console.log({userdata,name,index})
    if (s?.left?.includes(username)) {
      console.log("left");
      alert("You left the subgreddiit");
      return;
    }
    const name = s.Name;
    axios
      .post("http://localhost:5000/addinrequest", {
        name,
        username,
        store: localStorage.getItem("token"),
        q: localStorage.getItem("hello"),
      })
      .then((response) => {
        if (response.data.message === 0) {
          alert("wrong user");
          navigate("/");
          console.log("wrong");
        }
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
        setfollows(1);
      })
      .catch(function (error) {
        console.log(error);
      });
    // <Rightbar/>
  }
  function incvisits(name) {
    axios
      .post("http://localhost:5000/incvisits", {
        Name: name,
        store: localStorage.getItem("token"),
        q: localStorage.getItem("hello"),
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
  const leave = async (name) => {
    // const username = userdata;
    const per = await axios.post("http://localhost:5000/leave", {
      name,
      username,
      store: localStorage.getItem("token"),
      q: localStorage.getItem("hello"),
    });
    try {
      if (per.data.message === 0) {
        alert("wrong user");
        navigate("/");
        console.log("wrong");
      }
      console.log(per);
      setfollows(2)
    } catch (error) {
      console.log(error);
    }
  };
  return done ? (
    <div className="post" style={{ width: "80%" }}>
      <div className="postWrapper">
        <div className="postTop">
          <div key={s} className="subg">
            {/* <p>heloooooooooooo</p> */}
            <p>
              <span style={{ fontSize: "30px", fontWeight: "bold" }}>
                {s.Name}
              </span>
              <div style={{ float: "right" }}>
                <Link to={`/subgreddiit/${s.Name}/posts`}>
                  <LoginIcon
                    onClick={() => {
                      incvisits(s.Name);
                    }}
                  ></LoginIcon>
                </Link>
              </div>
            </p>
            {/* <a href="/asxcvgfd">{s.description}</a> */}
            <span className="data">
              <b>Moderator:</b> {s.moderator[0].username}
            </span>
            <span className="data">
              <b>Followers:</b> {s.followers.length}
            </span>
            <span className="data">
              <b>Posts:</b> {s.no_of_posts}
            </span>
            <span className="data claimedRight">
              <b>Description:</b> {s.description}
            </span>
            <span className="data claimedRight1">
              <b>Banned keywords:</b> {s.banned_keywords}
            </span>
            <span>
              {follows === 2 ? (
                <button onClick={() => addinrequest(s.Name, s.id)}>
                  Follow
                </button>
              ) : follows === 0 &&
                s.moderator[0].email === localStorage.getItem("hello") ? (
                <span>following</span>
              ) : follows === 1 ? (
                <span>requested</span>
              ) : follows === 0 &&
                s.moderator[0].email !== localStorage.getItem("hello") ? (
                <>
                  <span>following</span>
                  <button onClick={() => leave(s.Name)}>Leave</button>
                </>
              ) : (
                <></>
              )}
            </span>
            {/* {s.moderator[0].email === localStorage.getItem("hello") ? (
         <span>
           <button className="follow" disabled>
             Following
           </button>
         </span>
       ) : (
         <span>
           <button
             className="follow"
             disabled={isclicked[s.id]}
             onClick={() => {
               addinrequest(s.id);
             }}
           >
             Follow
           </button>
         </span>
       )} */}

            {/* <span>
   <button
     className="delete"
     onClick={() => deletesub(s.Name, s.id)}
   >
     Delete
   </button>
 </span> */}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
export default Displaydata;
