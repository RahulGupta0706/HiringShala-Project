import React from "react";
import "./heading.css";
import { MdNotificationAdd } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Cookies from "js-cookie";
import * as Constants from "../../../constants/String"
function Heading() {
  const pictureLink = Cookies.get(Constants.picture);

  return (
    <div className="top">
      <div className="top-left">Dashboard</div>
      <div className="top-right">
        <div className="top-notification-icon">
          <i className="fa fa-bell">
            <MdNotificationAdd />
          </i>
        </div>
        <div className="top-profile-icon">
          {pictureLink ? (
            <img src={pictureLink} alt="img" className="img-fluid profile-image" />
          ) : (
            <CgProfile className="default-profile-icon" />
          )}
        </div>
        <h4>{Cookies.get(Constants.userName)}</h4>
      </div>
    </div>
  );
}

export default Heading;
