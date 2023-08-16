import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar ,buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import HotelIcon from '@mui/icons-material/Hotel';
const Featured = () => {
  return (
    <div className="featured font-poppins">
    <div className="top">
      <h1 className="title text-gray-500">Total Room Bookings</h1>
      <HotelIcon fontSize="small" />
    </div>
    <div className="bottom">
      <div className="featuredChart">
        <CircularProgressbar value={70} text={"70%"} strokeWidth={5}
          styles={buildStyles({
            pathColor: `#7EAE3C`,
            backgroundColor: '#3e98c7',
            textColor: '#333333'
          })}
        />
      </div>
      <p className="title text-gray-500">Rooms Booked Today</p>
      <p className="amount">37</p>
      <p className="desc text-gray-500">
        Information might not include real-time bookings. Please refresh for the latest data.
      </p>
      <div className="summary">
        <div className="item">
          <div className="itemTitle text-gray-500">Occupancy Target</div>
          <div className="itemResult negative">
            <KeyboardArrowDownIcon fontSize="small" />
            <div className="resultAmount">85%</div>
          </div>
        </div>
        <div className="item">
          <div className="itemTitle text-gray-500">Last Week</div>
          <div className="itemResult positive">
            <KeyboardArrowUpOutlinedIcon fontSize="small" />
            <div className="resultAmount">$8.2k</div>
          </div>
        </div>
        <div className="item">
          <div className="itemTitle text-gray-500">Last Month</div>
          <div className="itemResult positive">
            <KeyboardArrowUpOutlinedIcon fontSize="small" />
            <div className="resultAmount">$32.9k</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Featured;
