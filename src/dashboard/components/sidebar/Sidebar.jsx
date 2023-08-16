import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AddHome } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { blackLogo} from "../../../assets";
const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
        <img src={blackLogo} alt="companyLogo" className="w-[140px] h-[36px]" />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>  
          <li>
            <AddHome className="icon" />
            <Link to="/propertyAdd" style={{ textDecoration: "none" }}>
            <span>Property</span>
            </Link>
          </li>        
        </ul>
      </div>
      
    </div>
  );
};

export default Sidebar;
