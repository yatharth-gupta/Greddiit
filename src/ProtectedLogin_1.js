import Login from "./pages/login/Login";
import {Navigate} from "react-router-dom"
 
 const ProtectedLogin = ({children,user})=>{
    console.log(user)
    console.log("user is there")
    if (user)return <Navigate to='/'></Navigate>;
    console.log("going to Home_page")

    return children;
 }

 export default ProtectedLogin