import Login from "./pages/login/Login";
import {Navigate} from "react-router-dom"
 
 const ProtectedLogin2 = ({children,user})=>{
    console.log(user)
    console.log("user is there")
    if (user)return <Navigate to='/mysubgreddiit'></Navigate>;
    console.log("going to mysubgreddiit")

    return children;
 }

 export default ProtectedLogin2