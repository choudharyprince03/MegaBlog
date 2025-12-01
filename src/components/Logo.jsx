import React from "react";
import logo from "../assets/blogged-high-resolution-logo-grayscale-transparent.png";

const Logo = ({ width = "100px" }) => {
  return (
    <img
      src={logo}
      alt="LOGO"
      style={{ width: width }} // apply custom width
    />
  );
};

export default Logo;
