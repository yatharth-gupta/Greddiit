import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Comments({ data }) {
  const [text, settext] = useState(null);
  const [datanew, setdatanew] = useState(null);
  const [reply, setreply] = useState(null);
  const [gotreplies, setgotreplies] = useState(false);
  const [newcommentid, setnewcommentid] = useState(false);
  useEffect(() => {
    setdatanew(data);
  }, []);
  function addreply(id) {
    axios
      .post("http://localhost:5000/addreply", {
        id,
        text,
        parent:data.parent,
        // username,
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
        // var comm = [...comments]
        // comm.push({ text, username });
        // setcomments(comm)
        // console.log("hii3");
        // setno_of_comments(no_of_comments + 1);
        // navigate(`/subgreddiit/${Name}/posts`);
        setnewcommentid(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .post("http://localhost:5000/addreply", {
        id,
        text,
        // username,
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
        // var comm = [...comments]
        // comm.push({ text, username });
        // setcomments(comm)
        // console.log("hii3");
        // setno_of_comments(no_of_comments + 1);
        // navigate(`/subgreddiit/${Name}/posts`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function showreply(id) {
    // const name = post.id1;
    console.log("hii2");
    axios
      .post("http://localhost:5000/showcomments", {
        Name: id,
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
        var temp1 = [];
        console.log(response?.data?.length);
        for (let i = 0; i < response?.data?.length; i++) {
          console.log(i);
          temp1.push({
            id: i,
            id1: response?.data[i]?._id,
            username: response?.data[i]?.username,
            text: response?.data[i]?.text,
            childids: response?.data[i]?.childids,
          });
        }
        setreply(temp1);
        setgotreplies(true)
        console.log("bsdk123 : ", temp1);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div>
      {/* <p>commented by -: {c.username}</p> */}
      <span>Comment -: {data.text}</span>
      <span>
        <Popup
          trigger={<button className="profileInfoName">reply</button>}
          modal
          nested
        >
          {(close) => (
            <>
              <p style={{ textAlign: "center", fontSize: "30px" }}>
                {" "}
                <u> reply</u>
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
                    addreply(datanew.id1);
                  }}
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </Popup>
      </span>
      <span>
        <button
          onClick={() => {
            showreply(datanew.id1);
          }}
        >
          show replies
        </button>
        
        {gotreplies?(
        reply.map((r) => [<Comments data={r} />])):(<span>loading</span>)}
      </span>
    </div>
  );
}
