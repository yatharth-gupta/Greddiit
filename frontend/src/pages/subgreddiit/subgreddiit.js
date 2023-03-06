import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";
import { CircularProgress } from "@mui/material";
import { Search } from "@mui/icons-material";
import "./subgreddiit.css";
import { Link } from "react-router-dom";
import Feed from "../../components/feed/Feed";
import TurnedInRoundedIcon from "@mui/icons-material/TurnedInRounded";
import CancelIcon from "@mui/icons-material/Cancel";
import LoginIcon from "@mui/icons-material/Login";
import Displaydata from "./displaydata";

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${day}-${month}-${year}`;

const Subgreddiit = (props) => {
  // const { name } = useParams();
  const [subgdata, setsubgdata] = useState({});
  const [displaydata, setdisplaydata] = useState({});
  const [tagdata, settagdata] = useState({});
  const [searchdata, setsearchdata] = useState({});
  const [final, setfinal] = useState({});
  const [userdata, setuserdata] = useState();
  const [search, setsearch] = useState("");
  const [issearch, setissearch] = useState(0);
  const [istag, setistag] = useState(0);
  const [alltags, setalltags] = useState([]);
  const [dummy, setdummy] = useState(0);
  const [change, setchange] = useState(0);
  // let alltags = []
  // const [username, setusername] = useState(null);
  let i = 0;
  const [done, setdone] = useState(false);
  const [view, setview] = useState(0);
  // const [isclicked,setisclicked] = useState([])
  var isclicked = [false, false];
  const [follows, setfollows] = useState(new Array(100).fill(0));
  let navigate = useNavigate();
  // function button_(index) {
  //   setview(index);
  //   navigate(`/subgreddiit/${name}`);
  //   // window.location.reload();
  // }
  // const [followersarray, setfollowersarray] = useState([]);

  useEffect(() => {
    const Email = localStorage.getItem("hello");
    console.log(Email);
    axios
      .post("http://localhost:5000/getusername", {
        email: Email,
        store: localStorage.getItem("token"),
        q: localStorage.getItem("hello"),
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
        if (!userdata) setuserdata(response.data);
        console.log(userdata);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (userdata) {
      axios
        .post("http://localhost:5000/allsubgreddiitdata", {
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
            var join = 2;
            if (response?.data[i]?.followers.includes(userdata)) {
              join = 0;
            } else if (response?.data[i]?.request.includes(userdata)) {
              join = 1;
            }
            temp.push({
              id: i,
              join: join,
              no_of_followers: response?.data[i]?.no_of_followers,
              no_of_posts: response?.data[i]?.no_of_posts,
              moderator: response?.data[i]?.moderator,
              followers: response?.data[i]?.followers,
              blocked: response?.data[i]?.blocked,
              left: response?.data[i]?.left,
              request: response?.data[i]?.request,
              Name: response?.data[i]?.Name,
              description: response?.data[i]?.description,
              tags: response?.data[i]?.tags,
              banned_keywords: response?.data[i]?.banned_keywords,
            });

            // }
          }
          // // const followersarray = [temp.followers]
          // // followersarray.push()
          // console.log(temp[0].followers)
          // if(temp[0]?.followers?.includes(userdata))
          // {
          //   setfollows(1)
          //   console.log("hii there")
          // }
          setsubgdata(temp);
          // setdisplaydata(temp);
          setdisplaydata(
            [...temp].sort(function (a, b) {
              return a.join - b.join;
            })
          );
          console.log("bsdk1 : ", temp);
          setdone(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [userdata, change]);

  // function addinrequest(index) {
  //   // setisclicked(true)
  //   // const email = localStorage.getItem("hello");
  //   const username1 = userdata;
  //   const name = subgdata[index].Name;
  //   console.log({ userdata, name, index });
  //   axios
  //     .post("http://localhost:5000/addinrequest", { name, username1 })
  //     .then((response) => {
  //       console.log(response);
  //       // alert("added");
  //       // setfollowingusername((followingusername) => [
  //       //   ...followingusername,
  //       //   users[index].username,
  //       // ]);
  //       // <Navigate to="/"></Navigate>
  //       // navigate("/home")
  //       // setisclicked
  //       isclicked[index] = "true";
  //       console.log(isclicked[index]);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   // <Rightbar/>
  // }

  function searchsub() {
    var text = document.getElementById("search").value;
    console.log(text);
    axios
      .post("http://localhost:5000/search", {
        Name: text,
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
        var temp = [];
        for (let i = 0; i < response?.data?.length; i++) {
          var join = 2;
          if (response?.data[i]?.followers.includes(userdata)) {
            join = 0;
          }
          if (response?.data[i]?.request.includes(userdata)) {
            join = 1;
          }
          temp.push({
            id: i,
            join: join,
            no_of_followers: response?.data[i]?.no_of_followers,
            no_of_posts: response?.data[i]?.no_of_posts,
            moderator: response?.data[i]?.moderator,
            followers: response?.data[i]?.followers,
            blocked: response?.data[i]?.blocked,
            left: response?.data[i]?.left,
            request: response?.data[i]?.request,
            Name: response?.data[i]?.Name,
            description: response?.data[i]?.description,
            tags: response?.data[i]?.tags,
            banned_keywords: response?.data[i]?.banned_keywords,
          });
          // }
        }
        setsearchdata(temp);
        console.log("bsdk1 : ", temp);
        console.log("bsdk2 : ", displaydata);
        if (text) setissearch(issearch + 1);
        else setissearch(0);
        // mapfunction();
      })
      .catch(function (error) {
        console.log(error);
      });
    // <Rightbar/>
  }

  useEffect(() => {
    // if (alltags.length === 0) {
    //   setistag(0);
    // } else {
    //   setistag(istag + 1);
    // }
    // if (alltags) {
    if (dummy) {
      console.log(alltags);
      axios
        .post("http://localhost:5000/tag", {
          all: alltags,
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
          var temp = [];
          for (let i = 0; i < response?.data?.length; i++) {
            var join = 2;
            if (response?.data[i]?.followers.includes(userdata)) {
              join = 0;
            }
            if (response?.data[i]?.request.includes(userdata)) {
              join = 1;
            }
            temp.push({
              id: i,
              join: join,
              no_of_followers: response?.data[i]?.no_of_followers,
              no_of_posts: response?.data[i]?.no_of_posts,
              moderator: response?.data[i]?.moderator,
              followers: response?.data[i]?.followers,
              blocked: response?.data[i]?.blocked,
              left: response?.data[i]?.left,
              request: response?.data[i]?.request,
              Name: response?.data[i]?.Name,
              description: response?.data[i]?.description,
              tags: response?.data[i]?.tags,
              banned_keywords: response?.data[i]?.banned_keywords,
            });
            // }
          }
          settagdata(temp);
          console.log("bsdk1 : ", temp);
          console.log("bsdk2 : ", displaydata);
          if (alltags.length !== 0) setistag(istag + 1);
          else setistag(0);

          // mapfunction();
        })
        .catch(function (error) {
          console.log(error);
        });
      // }
    }
  }, [alltags, dummy]);
  const tagsub = () => {
    var text = document.getElementById("tag").value;
    console.log(text);
    // alltags.push(text)
    setalltags((alltags) => [...alltags, text]);
    setdummy(dummy + 1);
    // <Rightbar/>
  };

  const deletetag = (element) => {
    console.log(alltags.indexOf(element));
    var index = alltags.indexOf(element);
    // delete alltags[index];
    alltags.splice(index, 1);
    console.log(alltags);
    setalltags(alltags);
    setdummy(dummy + 1);

    // <Rightbar/>
  };

  useEffect(() => {
    console.log(istag);
    console.log(issearch);
    console.log(tagdata);
    if (istag && !issearch) {
      setdisplaydata(tagdata);
    } else if (istag && issearch) {
      const final = Object.values(searchdata).filter((a) =>
        tagdata.some((b) => a.Name === b.Name)
      );
      setdisplaydata(final);
    } else if (!istag && !issearch) {
      setdisplaydata(subgdata);
    } else {
      // searchsub();
      setdisplaydata(searchdata);
    }
  }, [istag, issearch]);

  const handleSortASC = async (e) => {
    // e.preventDefault();
    // console.log(data);
    // await setchange(change+1);
    setdisplaydata(
      [...displaydata].sort((a, b) => a.Name.localeCompare(b.Name))
    );
  };
  const handleSortDESC = (e) => {
    // e.preventDefault();
    // console.log(data);
    setdisplaydata(
      [...displaydata].sort((b, a) => a.Name.localeCompare(b.Name))
    );
  };
  const handleSortTIME = (e) => {
    // e.preventDefault();
    // console.log(data);
    setdisplaydata(
      subgdata.filter((a) => displaydata.some((b) => a.Name === b.Name))
    );
  };
  const handleSortFollowers = (e) => {
    // e.preventDefault();
    setdisplaydata(
      [...displaydata].sort(function (a, b) {
        return a.followers.length - b.followers.length;
      })
    );
    console.log(displaydata);
  };
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
  const leave = async (name, index) => {
    const username = userdata;
    const id = displaydata.findIndex((obj) => obj.id === index);
    console.log([...displaydata][id]);
    const arr = [...displaydata][id];
    arr.join = 0;
    setdisplaydata(arr);
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
      setfollows(2);
    } catch (error) {
      console.log(error);
    }
  };
  function addinrequest(name, index) {
    // setisclicked(true)
    // const email = localStorage.getItem("hello");
    // const username1 = userdata
    // const name = subgdata[index].Name
    // console.log({userdata,name,index})
    const id = displaydata.findIndex((obj) => obj.id === index);
    console.log([...displaydata][id]);
    if (displaydata[id].left.includes(userdata)) {
      console.log("left");
      alert("You left the subgreddiit");
      return;
    } else {
      const arr = [...displaydata][id];
      arr.join = 1;
      setdisplaydata(arr);
    }
    const username = userdata;
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
        // setfollows(2);
      })
      .catch(function (error) {
        console.log(error);
      });
    // <Rightbar/>
  }
  return done ? (
    <>
      {console.log(isclicked[1])}
      {/* {console.log(subgdata.followers)} */}
      <Topbar />
      {/* <form onSubmit={searchsub()}> */}
      <div className="sorting_searching">
        <div className="searchbar">
          <Search className="searchIcon" onClick={() => searchsub()} />
          <input
            type="text"
            placeholder="Search"
            // style={{ border: "none" }}
            className="searchInput"
            // value={search}
            // onChange={(e) => {
            //   setsearch(e.target.value);
            // }}
            id="search"
            name="search"
            // value="default"
            // value="default"
          />
        </div>

        {/* <input type="submit" value="Search"/> */}
        {/* <div className="searchbar"> */}
        {/* <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          /> */}
        {/* </div> */}
        {/* <button onClick={() => searchsub()}>search</button> */}
        <div className="tag">
          <input
            type="text"
            placeholder="tag"
            // value={search}
            // onChange={(e) => {
            //   setsearch(e.target.value);
            // }}
            className="searchInput"
            id="tag"
            name="tag"
            // value=""
            // value="default"
          />
          {/* <input type="submit" value="Search"/> */}
          <TurnedInRoundedIcon fontSize="large" onClick={() => tagsub()} />

          {/* <button className="addtag" onClick={() => tagsub()}>Add Tag</button> */}
        </div>
        <button className="sorting" onClick={() => handleSortASC()}>
          ASC
        </button>
        <button className="sorting" onClick={() => handleSortDESC()}>
          DESC
        </button>
        <button className="sorting" onClick={() => handleSortTIME()}>
          time
        </button>
        <button className="sorting" onClick={() => handleSortFollowers()}>
          followers
        </button>
      </div>

      {alltags.map((h) => {
        console.log(h);
        return (
          <span className="cancelspan" key={h}>
            {h}

            <CancelIcon
              className="cancel"
              onClick={() => deletetag(h)}
            ></CancelIcon>
          </span>
        );
      })}

      {/* </form> */}
      {/* {issearch ? (
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
      )} */}
      {/* {mapfunction()} */}
      <ul>
        {Object.values(displaydata).map((s) => {
          console.log("httytffttf", s);
          return (
            // <Displaydata s={s} username={userdata}/>
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
                      {s.join === 2 ? (
                        <button onClick={() => addinrequest(s.Name, s.id)}>
                          Follow
                        </button>
                      ) : s.join === 0 &&
                        s.moderator[0].email ===
                          localStorage.getItem("hello") ? (
                        <span>following</span>
                      ) : s.join === 1 ? (
                        <span>requested</span>
                      ) : s.join === 0 &&
                        s.moderator[0].email !==
                          localStorage.getItem("hello") ? (
                        <>
                          <span>following</span>
                          <button onClick={() => leave(s.Name, s.id)}>
                            Leave
                          </button>
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
          );
          // return <div>
          //   hjvhjvjhvhj
          //   {s.id}
          // </div>
        })}
      </ul>
      {/* <Subsidebar /> */}
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
