import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Mysubgreddiit from "./pages/mysubgreddiit/mysubgreddiit";
import Subdetails from "./pages/mysubgreddiit/subdetails";
import Register from "./pages/register/Register";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedLogin1 from "./ProtectedLogin";
import ProtectedLogin from "./ProtectedLogin_1";
import ProtectedLogin2 from "./ProtectedLogin_2";
import Subgreddiit from "./pages/subgreddiit/subgreddiit";
import Chats from "./pages/chat/chat";
import { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  // navigate,
  useNavigate,
} from "react-router-dom";
import Savedposts from "./pages/saved_Posts/saved_posts";
function App() {
  //login-signup toggle
  const [currform, setcurrform] = useState("Login");
  const toggleform = (formname) => {
    setcurrform(formname);
  };

  // to check user presence
  const [user, setUser] = useState(null);

  //userdata
  // const [username, setusername] = useState("");
  // const [first_name, setfirst_name] = useState("");
  // const [second_name, setsecond_name] = useState(null);
  // const [contact, setcontact] = useState(null);
  // const [email, setemail] = useState(null);
  // const [age, setage] = useState(null);

  const [userdata, setuserdata] = useState(null);
  const [followdata, setfollowdata] = useState(null);
  // const[followers,setfollowers] = useState([]);
  // const[following,setfollowing] = useState([]);

  // const setdata = async(abc)=>{
  //   // await setuserdata(abc);
  //   var hehe = setuserdata(abc)
  //   console.log(`hehe `,hehe)
  //   console.log(userdata)
  // }
  return (
    <>
      {/* <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
      <script src="yatharth.js"></script> */}
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route
            path="/"
            element={
              <ProtectedLogin>
                {currform === "Login" ? (
                  <Login onFormSwitch={toggleform} />
                ) : (
                  <Register onFormSwitch={toggleform} />
                )}
              </ProtectedLogin>
            }
          />
          <Route
            path="/home"
            element={
              // <ProtectedLogin user={user}>
              <Home />
              // </ProtectedLogin>
            }
          />
          <Route
            path="/Profile_page"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mysubgreddiit"
            element={
              <ProtectedRoute>
                <Mysubgreddiit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subgreddiit/:name/posts"
            element={
              // <ProtectedLogin1 user={user}>
              <ProtectedRoute>
                <Subdetails vie={0}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/subgreddiit/:name/users"
            element={
              // <ProtectedLogin1 user={user}>
              <ProtectedRoute>
                <Subdetails vie={1}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/subgreddiit/:name/reportedposts"
            element={
              <ProtectedRoute>
                <Subdetails vie={4}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/subgreddiit/:name/stats"
            element={
              <ProtectedRoute>
                <Subdetails vie={3}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/subgreddiit/:name/joiningrequests"
            element={
              <ProtectedRoute>
                <Subdetails vie={2}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/subgreddiit"
            element={
              <ProtectedRoute>
                <Subgreddiit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved_posts"
            element={
              // <ProtectedLogin1 user={user}>
              <ProtectedRoute>
                <Savedposts></Savedposts>
              </ProtectedRoute>
            }
          />
          <Route
            path="/chats"
            element={
              // <ProtectedLogin1 user={user}>
              <ProtectedRoute>
                <Chats></Chats>
              </ProtectedRoute>
            }
          />
          <Route
            path="/chats/:username"
            element={
              // <ProtectedLogin1 user={user}>
              <ProtectedRoute>
                <Chats></Chats>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
