
// export default function Register() {
  //   return (
    //     <div className="login">
//       <div className="loginWrapper">
//         <div className="loginLeft">
//           <h3 className="loginLogo">Lamasocial</h3>
//           <span className="loginDesc">
//             Connect with friends and the world around you on Lamasocial.
//           </span>
//         </div>
//         <div className="loginRight">
//           <div className="loginBox">
//             <input placeholder="Username" className="loginInput" />
//             <input placeholder="Email" className="loginInput" />
//             <input placeholder="Password" className="loginInput" />
//             <input placeholder="Password Again" className="loginInput" />
//             <button className="loginButton">Sign Up</button>
//             <button className="loginRegisterButton">
//               Log into Account
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import "./register.css";
import React from "react";
import logo from "./logo.svg";
import { Navigate,useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const Signup = (props) => {
  
  // interface response {
  //   response: string | "No Response"
  // }
  let naviagte = useNavigate();
    const inputStyle = {border: "1px solid black", height: 75, "padding": 10}
    const [person, setPerson] = useState({first_name:"",
    second_name:"", age:"",contact:"",username:"", email:"",password:""})
    const [response, setResponse] = useState(null)

    const sumbitForm = (e) => {
      e.preventDefault()
      console.log(person);
       axios.post('http://localhost:5000/signup', person)
      .then((response) => {
        // setResponse(response.data)
        console.log(response.data)
        props.onFormSwitch("Login");
        naviagte("/")
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    const onChangeHandler = (event) => {
      const {name, value} = event
        setPerson((prev) => {
          return {...prev, [name]: value}
        })
    }
  return (
    <div className="total">
      <div className="details">
        <div className="img">
          <img src={logo} alt="logo" className="image" />
        </div>
        <h3 style={{ textAlign: "center" }}>Please Enter the information</h3>
        <div>
          <form className="input" onSubmit={sumbitForm}>
            <input
              type="name"
              placeholder="First Name"
              name="first_name"
              value={person.first_name} onChange={(e) => onChangeHandler(e.target)}
              required
              // onfocus="this.placeholder = ''"
              />
            <input
              type="name"
              placeholder="Last Name"
              name="second_name"
              value={person.second_name} onChange={(e) => onChangeHandler(e.target)}
              // onfocus="this.placeholder = ''"
              />
            <input
              type="number"
              placeholder="Age"
              name="age"
              value={person.age} onChange={(e) => onChangeHandler(e.target)}
              // onfocus="this.placeholder = ''"
              />
            <input
              type="number"
              placeholder="Contact-no"
              name="contact"
              value={person.contact} onChange={(e) => onChangeHandler(e.target)}
              // onfocus="this.placeholder = ''"
              />
            <input
              type="text"
              placeholder="username"
              name="username"
              value={person.username} onChange={(e) => onChangeHandler(e.target)}
              // onfocus="this.placeholder = ''"
              />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={person.email} onChange={(e) => onChangeHandler(e.target)}
              required
              // onfocus="this.placeholder = ''"
              />
            <input
              type="password"
              placeholder="password"
              name="password"
              value={person.password} onChange={(e) => onChangeHandler(e.target)}
              required
              // onfocus="this.placeholder = ''"
            />
            <input type="submit" value="Sign-up" className="submit" />
          </form>
        </div>
        <div className="sign-up">
          <p style={{ textAlign: "center" }}>Already have an account?</p>
          {/* <Link to="/Login" className="create_new">
            Login
          </Link> */}
          <button
            className="create_new"
            onClick={() => props.onFormSwitch("Login")}
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};
export default Signup;
