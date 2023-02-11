import Login from "./pages/login/Login";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const ProtectedLogin1 = ({ children, user, setUser,setuserdata, userdata }) => {
  useEffect(() => {
    if (localStorage.getItem("hello")) {
      setUser("sdgsg");
    } else {
      setUser(null);
    }
  }, []);
  // console.log(user + "1");
  let navigate = useNavigate();
  console.log("user is there");
  // useEffect(() => {
  // useEffect( () => {
  // console.log(user);
  // }, [userdata]);
  if (!user) navigate("/");
  else {
    const Email = localStorage.getItem("hello");
    console.log(Email);
    axios
      .post("http://localhost:5000/req_data", { email: Email })
      .then((response) => {
        console.log(response.data.contact);
        // console.log(response.data);
        // setfirst_name(response?.data?.first_name);
        // setsecond_name(response?.data?.second_name);
        // setage(response?.data?.age);
        // setemail(response?.data?.email);
        // setusername(response?.data?.username);
        // setcontact(response?.data?.contact);
        console.log(userdata);
        if (!userdata) setuserdata(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // try {
    //   const response = await axios.post("http://localhost:5000/req_data", {
    //     email: Email,
    //   });
    //   setuserdata(response.data);
    //   // localStorage.setItem("hello", response.data.data.email);
    //   // setUser("ABCH");
    //   // navigate("/Profile_page");
    // } catch (error) {
    //   console.log(error);
    // }
    console.log("going to Profile_page");
  }
  return children;
  // },[]);
};

export default ProtectedLogin1;
