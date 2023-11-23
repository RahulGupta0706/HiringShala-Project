import React from "react";
import Template from "../components/Template";
import LoginImg from "../components/assets/Login.png";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import * as Constants from "../constants/String"

const Login = (props) => {
  const isLoggedIn =
    Cookies.get(Constants.userId) !== undefined && Cookies.get(Constants.userId) !== "";

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <Template
      title="Welcome Back"
      desc1="Skill seekho chahe jahaan se.."
      desc2="Job milega yha se..."
      image={LoginImg}
      formtype="login"
      userType={props.userType}
    />
  );
};

export default Login;
