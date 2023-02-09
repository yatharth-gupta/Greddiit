import "./topbar.css";
import logo from "./greddiit.svg";
import { Search, Person, Chat, Notifications, Home } from "@mui/icons-material";
import { useNavigate } from "react-router";
import home from "../../pages/home/Home";
import RedditIcon from "@mui/icons-material/Reddit";
export default function Topbar() {
  // const HomeIcon = createSvgIcon(
  //   <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  //   'Home',
  // );
  let navigate = useNavigate();
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        {/* <img src={logo} alt="" /> */}
        {/* <span><img src={logo} alt="" /></span> */}
        {/* <span className="logo">GREDDIIT</span> */}
        <p style={{ display: "inline" }}>
          <img src={logo} alt="" />
        </p>
        <p style={{ display: "inline" }} className="logo">
          GREDDIIT
        </p>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <button
            className="homeii"
            onClick={() => {
              // console.log("yo!");
              navigate("/subgreddiit");
              // <home/>
            }}
          >
            {/* <RedditIcon size="small" className="topbarLink" /> */}
            All Subgreddiit
            {/* <span className="topbarLink" >Homepage</span> */}
          </button>
          <button
            className="homeii"
            onClick={() => {
              // console.log("yo!");
              navigate("/mysubgreddiit");
              // <home/>
            }}
          >
            <RedditIcon size="small" className="topbarLink" />
            {/* my Subgreddiit */}
            {/* <span className="topbarLink" >Homepage</span> */}
          </button>
          <button
            className="homeii"
            onClick={() => {
              // console.log("yo!");
              navigate("/home");
              // <home/>
            }}
          >
            <Home size="small" className="topbarLink" />
            {/* <span className="topbarLink" >Homepage</span> */}
          </button>
          <button
            className="homeii"
            onClick={() => {
              // console.log("yo!");
              navigate("/Profile_page");
              // <home/>
            }}
          >
            <Person size="small" className="topbarLink" />
            {/* <span className="topbarLink" >Homepage</span> */}
          </button>
          {/* <span className="topbarLink">Timeline</span> */}
          <div className="dropdown">
            <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
            <div className="dropdown-content">
              <p
                style={{
                  margin: "12px",
                  marginTop: "8px",
                  marginBottom: "8px",
                }}
                className="logout"
                onClick={() => {
                  localStorage.removeItem("hello");
                  navigate("/");
                }}
              >
                Logout
              </p>
            </div>
          </div>
        </div>
        {/* <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person size="small"/>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
