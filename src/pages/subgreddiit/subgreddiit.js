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
  const [displaydata, setdisplaydata] = useState({});
  const [tagdata, settagdata] = useState({});
  const [final, setfinal] = useState({});
  const [userdata, setuserdata] = useState();
  const [search, setsearch] = useState("");
  const [issearch, setissearch] = useState(0);
  const [istag, setistag] = useState(0);
  const [alltags, setalltags] = useState([]);
  const [dummy, setdummy] = useState(0);
  // let alltags = []
  // const [username, setusername] = useState(null);
  let i = 0;
  const [done, setdone] = useState(false);
  const [view, setview] = useState(0);
  // const [isclicked,setisclicked] = useState([])
  var isclicked = [false, false];
  const [follows, setfollows] = useState(0);
  let navigate = useNavigate();
  function button_(index) {
    setview(index);
    navigate(`/subgreddiit/${name}`);
    // window.location.reload();
  }
  // const [followersarray, setfollowersarray] = useState([]);
  useEffect(() => {
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
  }, []);
  useEffect(() => {
    if (userdata) {
      axios
        .post("http://localhost:5000/allsubgreddiitdata")
        .then((response) => {
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
            temp.push({
              id: i,
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
          setdisplaydata(temp);
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
    const username1 = userdata;
    const name = subgdata[index].Name;
    console.log({ userdata, name, index });
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
        isclicked[index] = "true";
        console.log(isclicked[index]);
      })
      .catch(function (error) {
        console.log(error);
      });
    // <Rightbar/>
  }

  function searchsub() {
    var text = document.getElementById("search").value;
    console.log(text);
    axios
      .post("http://localhost:5000/search", { Name: text })
      .then((response) => {
        console.log(response);
        var temp = [];
        for (let i = 0; i < response?.data?.length; i++) {
          temp.push({
            id: i,
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
        setdisplaydata(temp);
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
        .post("http://localhost:5000/tag", { all: alltags })
        .then((response) => {
          console.log(response);
          var temp = [];
          for (let i = 0; i < response?.data?.length; i++) {
            temp.push({
              id: i,
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
  }, [alltags,dummy]);
  const tagsub = () => {
    var text = document.getElementById("tag").value;
    console.log(text);
    // alltags.push(text)
    setalltags((alltags) => [...alltags, text]);
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
      const final = Object.values(displaydata).filter((a) =>
        tagdata.some((b) => a.Name === b.Name)
      );
      setdisplaydata(final);
    } else if (!istag && !issearch) {
      setdisplaydata(subgdata);
    } else {
      searchsub();
    }
  }, [istag, issearch]);
  const mapfunction = () => {
    console.log(i++);
    console.log(subgdata);
    console.log(displaydata);
    const final = subgdata.filter((a) =>
      displaydata.some((b) => a.Name === b.Name)
    );
    // return (
    //   <ul>
    //     { final.map((s) => {
    //       {
    //         const gg = "/" + s.Name;
    //       }
    //       // console.log('httytffttf',s);
    //       return (
    //         <div key={s} className="subg">
    //           {/* <p>heloooooooooooo</p> */}
    //           <Link to={`/subgreddiit/${s.Name}`}>
    //             <p> {s.Name}</p>
    //           </Link>
    //           {/* <a href="/asxcvgfd">{s.description}</a> */}
    //           <span>Moderator: {s.moderator[0].username}</span>
    //           <span>Followers: {s.no_of_followers}</span>
    //           <span>Posts: {s.no_of_posts}</span>
    //           <span>Description: {s.description}</span>
    //           <span>Banned keywords: {s.banned_keywords}</span>

    //           {s.moderator[0].email === localStorage.getItem("hello") ? (
    //             <span>
    //               <button className="follow" disabled>
    //                 Following
    //               </button>
    //             </span>
    //           ) : (
    //             <span>
    //               <button
    //                 className="follow"
    //                 disabled={isclicked[s.id]}
    //                 onClick={() => {
    //                   addinrequest(s.id);
    //                 }}
    //               >
    //                 Follow
    //               </button>
    //             </span>
    //           )}

    //           {/* <span>
    //             <button
    //               className="delete"
    //               onClick={() => deletesub(s.Name, s.id)}
    //             >
    //               Delete
    //             </button>
    //           </span> */}
    //         </div>
    //       );
    //       // return <div>
    //       //   hjvhjvjhvhj
    //       //   {s.id}
    //       // </div>
    //     })}
    //   </ul>
    // );
    // return <p>helooooooooooooo</p>
  };
  const handleSortASC = (e) => {
    // e.preventDefault();
    // console.log(data);
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
    setdisplaydata(subgdata);
  };
  const handleSortFollowers = (e) => {
    // e.preventDefault();
    // console.log(data);
    setdisplaydata(
      [...displaydata].sort((a, b) =>
        a.no_of_followers.localeCompare(b.no_of_followers)
      )
    );
  };
  return done ? (
    <>
      {console.log(isclicked[1])}
      {/* {console.log(subgdata.followers)} */}
      <Topbar />
      {/* <form onSubmit={searchsub()}> */}
      <div>
        <input
          type="text"
          placeholder="Search"
          // value={search}
          // onChange={(e) => {
          //   setsearch(e.target.value);
          // }}
          id="search"
          name="search"
          // value="default"
          // value="default"
        />
        {/* <input type="submit" value="Search"/> */}
        <button onClick={() => searchsub()}>search</button>
        <input
          type="text"
          placeholder="tag"
          // value={search}
          // onChange={(e) => {
          //   setsearch(e.target.value);
          // }}
          id="tag"
          name="tag"
          // value=""
          // value="default"
        />
        {/* <input type="submit" value="Search"/> */}
        <button onClick={() => tagsub()}>Add Tag</button>
        <button onClick={() => handleSortASC()}>ASC</button>
        <button onClick={() => handleSortDESC()}>DESC</button>
        <button onClick={() => handleSortTIME()}>time</button>
        <button onClick={() => handleSortFollowers()}>followers</button>
      </div>
      {alltags.map((h) => {
        console.log(h);
        return <button onClick={() => deletetag(h)}>{h}</button>;
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
        {displaydata.map((s) => {
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

              {s.moderator[0].email === localStorage.getItem("hello") ? (
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
              )}

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
