import "./login.css";
import logo from "./logo.svg";
import google from "./google.svg";
import facebook from "./facebook.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
const Login = ({onFormSwitch }) => {
  // form data
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handlechangeemail = (e) => {
    setemail(e.target.value);
  };
  const handlechangepass = (e) => {
    setpassword(e.target.value);
  };

  let navigate = useNavigate();
  // useEffect(()=>{
  //   console.log(userdata)
  // },[userdata])
  const Formsubmit = async (e) => {
    // useEffect(() => {
    e.preventDefault();
    // console.log({ password, email });
    //  axios
    // .post("http://localhost:5000/login", { email, password })
    // .then((response) => {
    //   console.log("ngchgchcg",response.data.data);
    //   // if (response.data) {
    //     // props.setcontact(response.data.data.contact);
    //     // props.setusername(response.data.data.username);
    //     // props.setfirst_name(response.data.data.first_name);
    //     // props.setsecond_name(response.data.data.second_name);
    //     // props.setemail(response.data.data.email);
    //     // props.setage(response.data.data.age);
    //     setuserdata(response.data.data);
    //     console.log(userdata)
    //     // setdata(response.data.data);
    // localStorage.setItem("hello", response.data.data.email);
    // setUser("ABCH");
    // navigate("/Profile_page");
    //     // }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      const email1 = response.data.data.email;
      const token = response.data.token;
      localStorage.setItem("hello", email1);
      localStorage.setItem("token",token)
      navigate("/Profile_page");
    } catch (error) {
      console.log(error);
    }
    // });
  };
  return (
    <div className="total">
      <div className="details">
        <div className="img">
          <img src={logo} alt="logo" className="image" />
        </div>
        <h3 style={{ textAlign: "center" }}>Please login to your account</h3>
        <div>
          <form className="input" onSubmit={Formsubmit}>
            {/* <fieldset> */}
            <input
              type="email"
              placeholder="Email"
              id="email_"
              required
              value={email}
              onChange={handlechangeemail}
            />
            <input
              type="password"
              placeholder="password"
              required
              value={password}
              onChange={handlechangepass}
              // onfocus="this.placeholder = ''"
            />
            <input
              type="submit"
              value="Log-in"
              className="submit"
              disabled={!email||!password}
              // onClick={verify}
            />
          </form>
        </div>
        <p style={{ textAlign: "center", opacity: "0.5" }}>Forgot Password?</p>
        <p style={{ textAlign: "center" }}>Or login using</p>
        <div className="api_login">
          <img src={google} alt="google" />
          <img src={facebook} alt="facebook" className="fb" />
        </div>
        <div className="sign-up">
          <p style={{ textAlign: "center" }}>Do not have an account?</p>
          {/* <Link to="/Signup" className="create_new">
            CREATE NEW
          </Link> */}
          <button className="create_new" onClick={() => onFormSwitch("Signup")}>
            {" "}
            CREATE NEW
          </button>
        </div>
      </div>
    </div>
  );
};
// onClick={() => onFormSwitch("Signup")}
export default Login;
