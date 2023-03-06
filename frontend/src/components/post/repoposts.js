import { useState, useEffect } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';

export default function RepoPost({ p, username }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [istimeleft, setistimeleft] = useState(true);
  const name = p.Name;
  const [show, setshow] = useState(true);
  const [isignored, setisignored] = useState(false);
  const [uname,setuname] = useState(null)
  useEffect(()=>{
    axios
      .post("http://localhost:5000/getusername", {
        email: p.reportedby,
        store: localStorage.getItem("token"),q:localStorage.getItem("hello"),
      })
      .then((response) => {
        if (response.data.message === 0) {
          alert("wrong user");
          navigate("/");
          console.log("wrong");
        }
        setuname(response.data);
        // setchange1(change1 + 1);
      })
      .catch(function (error) {
        console.log(error);
      });
  },[])
  let navigate = useNavigate();
  // (function () {
    emailjs.init("s99SuHHUCbzPpg9-X");
  // })();
  const sendEmailblock = () => {
    // e.preventDefault();
    var data = {
      user_name: p.username,
      user_email: p.email,
      subg:p.Name,
      message:`You are now "BLOCKED" from subgreddiit ${p.Name}`
    };
    console.log("blocked")
    emailjs.send('service_u6xe612', 'contact_form',data).then(
      function () {
        console.log("SUCCESS!");
        alert("email sent");
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  };
  const sendEmaildelete = () => {
    // e.preventDefault();
    var data = {
      user_name: p.username,
      user_email: p.email,
      subg:p.Name,
      message:`One of your post in subgreddiit ${p.Name} is delete by Moderator`
    };
    emailjs.send('service_u6xe612', 'contact_form',data).then(
      function () {
        console.log("SUCCESS!");
        alert("email sent");
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  };
  const senddelete = () => {
    // e.preventDefault();
    var data1 = {
      user_name: uname,
      user_email: p.reportedby,
      subg:p.Name,
      message:`You reported a post in subgreddiit ${p.Name}, it was deleted by Moderator`
      // moderator:p.moderator[0].username
    };
    emailjs.send('service_u6xe612', 'template_5ia50ci',data1).then(
      function () {
        console.log("SUCCESS!");
        // alert("email sent");
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  };
  const sendignore = () => {
    // e.preventDefault();
    var data1 = {
      user_name: uname,
      user_email: p.reportedby,
      subg:p.Name,
      message:`You reported a post in subgreddiit ${p.Name}, it was ignored by Moderator`
      // moderator:p.moderator[0].username
    };
    emailjs.send('service_u6xe612', 'template_5ia50ci',data1).then(
      function () {
        console.log("SUCCESS!");
        // alert("email sent");
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  };
  const sendblock = () => {
    // e.preventDefault();
    var data1 = {
      user_name: uname,
      user_email: p.reportedby,
      subg:p.Name,
      message:`You reported a post in subgreddiit ${p.Name}, that user is blocked by Moderator`
      // moderator:p.moderator[0].username
    };
    emailjs.send('service_u6xe612', 'template_5ia50ci',data1).then(
      function () {
        console.log("SUCCESS!");
        // alert("email sent");
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  };
  
  function inc_delete() {
    axios
      .post("http://localhost:5000/inc_delete", { Name: name,
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

  function ignore() {
    setisignored(true);
    axios
      .post("http://localhost:5000/ignore", { name: name,
      store: localStorage.getItem("token"),q:localStorage.getItem("hello"),
    })
    .then((response) => {
      if (response.data.message === 0) {
        alert("wrong user");
        navigate("/");
        console.log("wrong");
      }
      sendignore()
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function blockuser() {
    const username = p.username;
    const id2 = p?.id1;
    axios
      .post("http://localhost:5000/blockuser", { name, username, id2,
      store: localStorage.getItem("token"),q:localStorage.getItem("hello"),
    })
    .then((response) => {
      if (response.data.message === 0) {
        alert("wrong user");
        navigate("/");
        console.log("wrong");
      }
        console.log(response);
        sendEmailblock();
        sendblock();
        setshow(false);
        // delete repoposts[index];
        // repoposts.splice(index, 1);
        // navigate(`/subgreddiit/${name}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function deletepost(index) {
    console.log(index);
    const id1 = p?.postid;
    const id2 = p?.id1;
    console.log(id1);
    axios
      .post("http://localhost:5000/deletepostpermanent", { id1, id2, name,
      store: localStorage.getItem("token"),q:localStorage.getItem("hello"),
    })
    .then((response) => {
      if (response.data.message === 0) {
        alert("wrong user");
        navigate("/");
        console.log("wrong");
      }
        console.log(response);
        sendEmaildelete();
        senddelete();
        setshow(false);
        // repoposts.splice(repoposts.map((e) => e.id).indexOf(index), 1);
        // navigate(`/subgreddiit/${name}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function func() {
    if (istimeleft) {
      setTimeLeft(3);
      setistimeleft(false);
    } else {
      document.getElementById(`delete_cancel${p.id}`).innerHTML = "Cancel";
      setTimeLeft(null);
      setistimeleft(true);
    }
  }

  useEffect(() => {
    if (!istimeleft)
      document.getElementById(`delete_cancel${p.id}`).innerHTML = "Cancel";
    else document.getElementById(`delete_cancel${p.id}`).innerHTML = "Delete";
  }, [istimeleft]);
  useEffect(() => {
    // if (!istimeleft)
    //   document.getElementById("delete_cancel").innerHTML = "Cancel";
    console.log(timeLeft)
    if (timeLeft === 0) {
      console.log("TIME LEFT IS 0");
      setTimeLeft(null);
      deletepost(p.id);
      inc_delete();
      senddelete();
    }

    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return show ? (
    <div className="allposts" key={p.id}>
      {console.log(p?.reportedby)}
      <p>Reported by -:{uname}</p>
      <p>Posted by -:{p?.username}</p>
      <p>Concern -:{p.concern}</p>
      <p>Reportedtext -:{p.reportedtext}</p>
      <p>subg -:{p.Name}</p>
      {/* <button onClick={()=>upvote()}>upvote {upvotes}</button>
                        <button onClick={()=>downvote()}>downvote {downvotes}</button> */}
      <Popup
        trigger={<button className="profileInfoName">show Post</button>}
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
      <button
        onClick={() => {
          func();
        }}
        disabled={p.ignored || isignored}
      >
        <span id={`delete_cancel${p.id}`}> Delete </span> {timeLeft}
      </button>
      {username === p.username ? (
        <span>You are reported</span>
      ) : (
        <button onClick={() => blockuser()} disabled={p.ignored || isignored}>
          block user
        </button>
      )}
      <button onClick={() => ignore()}>ignore</button>
    </div>
  ) : (
    <></>
  );
}
