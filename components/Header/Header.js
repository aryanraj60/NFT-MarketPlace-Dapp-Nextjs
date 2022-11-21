import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  console.log("Header render");
  return (
    <div className="Header mb-5">
      <Navbar />
    </div>
  );
};

export default Header;
