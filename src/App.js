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

  const [userdata,setuserdata] = useState(null)
  const [followdata,setfollowdata] = useState(null)
  // const[followers,setfollowers] = useState([]);
  // const[following,setfollowing] = useState([]);

  // const setdata = async(abc)=>{
  //   // await setuserdata(abc);
  //   var hehe = setuserdata(abc)
  //   console.log(`hehe `,hehe)
  //   console.log(userdata)
  // }
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route
          path="/"
          element={
            <ProtectedRoute user={user} setUser={setUser}>
              {currform === "Login" ? (
                <Login
                  onFormSwitch={toggleform}
                  setUser={setUser}
                  // setage={setage}
                  // setcontact={setcontact}
                  // setemail={setemail}
                  // setfirst_name={setfirst_name}
                  // setsecond_name={setsecond_name}
                  // setusername={setusername}
                  setuserdata = {setuserdata}
                  userdata = {userdata}
                  // setdata={setdata}
                />
              ) : (
                <Register onFormSwitch={toggleform} />
              )}
            </ProtectedRoute>
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
            <ProtectedLogin1
              user={user}
              // setfirst_name={setfirst_name}
              // setsecond_name={setsecond_name}
              // setusername={setusername}
              // setage={setage}
              // setemail={setemail}
              // setcontact={setcontact}
              setuserdata = {setuserdata}
              setUser = {setUser}
              userdata = {userdata}
            >
              <Profile
                // age={age}
                // contact={contact}
                email={localStorage.getItem("hello")}
                // first_name={first_name}
                // second_name={second_name}
                // username={username}
                // followers = {followers}
                // setfollowers = {setfollowers}
                // following = {following}
                // setfollowing = {setfollowing}
                userdata = {userdata}
                // setfollowdata = {setfollowdata}
                // followdata = {followdata}
              />
            </ProtectedLogin1>
          }
        />
        <Route
          path="/mysubgreddiit"
          element={
            <ProtectedLogin1
              user={user}
              // setfirst_name={setfirst_name}
              // setsecond_name={setsecond_name}
              // setusername={setusername}
              // setage={setage}
              // setemail={setemail}
              // setcontact={setcontact}
              setuserdata = {setuserdata}
              setUser = {setUser}
              userdata = {userdata}
            >
              <Mysubgreddiit
                // age={age}
                // contact={contact}
                email={localStorage.getItem("hello")}
                // first_name={first_name}
                // second_name={second_name}
                // username={username}
                // followers = {followers}
                // setfollowers = {setfollowers}
                // following = {following}
                // setfollowing = {setfollowing}
                userdata = {userdata}
                // setfollowdata = {setfollowdata}
                // followdata = {followdata}
              />
            </ProtectedLogin1>
          }
        />
        <Route
          path="/subgreddiit/:name"
          element={
            // <ProtectedLogin1 user={user}>
            <ProtectedLogin1
              user={user}
              // setfirst_name={setfirst_name}
              // setsecond_name={setsecond_name}
              // setusername={setusername}
              // setage={setage}
              // setemail={setemail}
              // setcontact={setcontact}
              setuserdata = {setuserdata}
              setUser = {setUser}
              userdata = {userdata}
            >
              <Subdetails/>
             </ProtectedLogin1>
          }
        /> 
        <Route
          path="/subgreddiit"
          element={
            // <ProtectedLogin1 user={user}>
            <ProtectedLogin1
              user={user}
              // setfirst_name={setfirst_name}
              // setsecond_name={setsecond_name}
              // setusername={setusername}
              // setage={setage}
              // setemail={setemail}
              // setcontact={setcontact}
              setuserdata = {setuserdata}
              setUser = {setUser}
              userdata = {userdata}
            >
              <Subgreddiit userdata = {userdata}/>
             </ProtectedLogin1>
          }
        /> 
        <Route
          path="/saved_posts"
          element={
            // <ProtectedLogin1 user={user}>
            <ProtectedLogin1
              user={user}
              // setfirst_name={setfirst_name}
              // setsecond_name={setsecond_name}
              // setusername={setusername}
              // setage={setage}
              // setemail={setemail}
              // setcontact={setcontact}
              setuserdata = {setuserdata}
              setUser = {setUser}
              userdata = {userdata}
            >
              <Savedposts></Savedposts>
             </ProtectedLogin1>
          }
        /> 
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
