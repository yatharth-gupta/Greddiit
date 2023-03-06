import Login from "./pages/login/Login";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
const ProtectedLogin = ({ children, user }) => {
  //  console.log(user)
  let navigate = useNavigate();
  console.log("ProtectedLogin me");
  axios
    .post("http://localhost:5000/auth", {
      store: localStorage.getItem("token"),q:localStorage.getItem("hello"),
    })
    .then((response) => {
      console.log(response.data.message);
      if (response.data.message === 1) {
        // navigate("/");
        console.log("hiiiii");
        navigate("/Profile_page");
      } 
    })
    .catch((err) => {
      console.log(err);
   });
   return children;
};

export default ProtectedLogin;
