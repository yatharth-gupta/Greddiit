import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";
import { CircularProgress } from "@mui/material";

// import "./subdetails.css";
import { Link } from "react-router-dom";
import Feed from "../../components/feed/Feed";
const Subgreddiit = (props) => {
  const { name } = useParams();
  const [subgdata, setsubgdata] = useState({});
  const [userdata, setuserdata] = useState();
  // const [username, setusername] = useState(null);

  const [done, setdone] = useState(false);
  const [view, setview] = useState(0);
  // const [isclicked,setisclicked] = useState([])
  var isclicked = [false,false]
  const [follows, setfollows] = useState(0);
  let navigate = useNavigate();
  function button_(index) {
    setview(index);
    navigate(`/subgreddiit/${name}`);
    // window.location.reload();
  }
  // const [followersarray, setfollowersarray] = useState([]);
  useEffect(()=>{
    const Email = localStorage.getItem("hello");
    console.log(Email);
    axios
      .post("http://localhost:5000/getusername", { email: Email })
      .then((response) => {
        console.log(response.data);
        // console.log(response.data);
        // setfirst_name(response?.data?.first_name);
        // setsecond_name(response?.data?.second_name);
        // setage(response?.data?.age);
        // setemail(response?.data?.email);
        // setusername(response?.data?.username);
        // setcontact(response?.data?.contact);
        if (!userdata) setuserdata(response.data);
        console.log(userdata);
      })
      .catch(function (error) {
        console.log(error);
      });
  },[])
  useEffect(() => {
    if(userdata)
    {
    axios
      .post("http://localhost:5000/allsubgreddiitdata")
      .then((response) => {
        console.log(response);
        // setResponse(response.data)
        // console.log(response);
        // props.onFormSwitch("Login");
        // naviagte("/");
        var temp = []
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
            id:i,
            no_of_followers: response?.data[i]?.no_of_followers,
            no_of_posts: response?.data[i]?.no_of_posts,
            moderator: response?.data[i]?.moderator,
            followers: response?.data[i]?.followers,
            blocked:response?.data[i]?.blocked,
            left:response?.data[i]?.left,
            request: response?.data[i]?.request,
            Name: response?.data[i]?.Name,
            description: response?.data[i]?.description,
            tags: response?.data[i]?.tags,
            banned_keywords: response?.data[i]?.banned_keywords,
        });
        // }
        }
        // const followersarray = [temp.followers]
        // followersarray.push()
        console.log(temp[0].followers)
        if(temp[0]?.followers?.includes(userdata))
        {
          setfollows(1)
          console.log("hii there")
        }
        setsubgdata(temp);
        console.log("bsdk1 : ", temp);
        setdone(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }, [userdata]);

  function addinrequest(index) {
    // setisclicked(true)
    // const email = localStorage.getItem("hello");
    const username1 = userdata
    const name = subgdata[index].Name
    console.log({userdata,name,index})
    axios
      .post("http://localhost:5000/addinrequest", { name, username1 })
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
        isclicked[index] = "true"
        console.log(isclicked[index]);
      })
      .catch(function (error) {
        console.log(error);
      });
    // <Rightbar/>
  }

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

            {s.moderator[0].email === localStorage.getItem("hello")?(<span>
                <button
                  className="follow"
                  disabled
                >
                  Following
                </button>
              </span>):(<span>
                <button
                  className="follow"
                  disabled={isclicked[s.id] }
                  onClick={()=>{addinrequest(s.id)}}
                >
                  Follow
                </button>
              </span>)}
              
              {/* <span>
                <button
                  className="delete"
                  onClick={() => deletesub(s.Name, s.id)}
                >
                  Delete
                </button>
              </span> */}
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

  return done ? (
    <>
    {console.log(isclicked[1])}
      {/* {console.log(subgdata.followers)} */}
      <Topbar />
      {/* <Subsidebar /> */}
      {mapfunction()}
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

export default Subgreddiit;
