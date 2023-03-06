import "./topbar.css";
import logo from "./greddiit.svg";
import { Search, Person, Chat, Notifications, Home } from "@mui/icons-material";
import { useNavigate } from "react-router";
import home from "../../pages/home/Home";
import RedditIcon from "@mui/icons-material/Reddit";
import GradeIcon from "@mui/icons-material/Grade";
import AllInboxRoundedIcon from "@mui/icons-material/AllInboxRounded";
import ForumIcon from '@mui/icons-material/Forum';
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
      {/* <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div> */}
      <div className="topbarRight">
        <div className="topbarLinks">
          <button
            className="homeii"
            onClick={() => {
              // console.log("yo!");
              navigate("/saved_posts");
              // <home/>
            }}
          >
            <div class="tooltip">
              <GradeIcon size="small" className="topbarLink tooltip" />
              <span class="tooltiptext">saved posts</span>
            </div>
          </button>
          <button
            className="homeii"
            onClick={() => {
              // console.log("yo!");
              navigate("/chats");
              // <home/>
            }}
          >
            <div class="tooltip">
              <ForumIcon size="small" className="topbarLink tooltip" />
              <span class="tooltiptext">Chats</span>
            </div>
          </button>
          <button
            className="homeii"
            onClick={() => {
              // console.log("yo!");
              navigate("/subgreddiit");
              // <home/>
            }}
          >
            <div class="tooltip">
            <AllInboxRoundedIcon size="small" className="topbarLink tooltip" />
              <span class="tooltiptext">All SubG</span>
            </div>
          </button>
          <button
            className="homeii"
            onClick={() => {
              // console.log("yo!");
              navigate("/mysubgreddiit");
              // <home/>
            }}
          >
            <div class="tooltip">
            <RedditIcon size="small" className="topbarLink tooltip" />
              <span class="tooltiptext">My SubG</span>
            </div>
            {/* my Subgreddiit */}
            {/* <span className="topbarLink" >Homepage</span> */}
          </button>
          {/* <button
            className="homeii"
            onClick={() => {
              // console.log("yo!");
              navigate("/home");
              // <home/>
            }}
          > */}
            {/* <div class="tooltip">
            <Home size="small" className="topbarLink tooltip" />
              <span class="tooltiptext">Home</span>
            </div> */}
            {/* <span className="topbarLink" >Homepage</span> */}
          {/* </button> */}
          <button
            className="homeii"
            onClick={() => {
              // console.log("yo!");
              navigate("/Profile_page");
              // <home/>
            }}
          >
            <div class="tooltip">
            <Person size="small" className="topbarLink tooltip" />
              <span class="tooltiptext">Profile</span>
            </div>
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
                  localStorage.removeItem("token");
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
