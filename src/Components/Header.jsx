import React from "react";
import { Link } from "react-router-dom";
import profile_img from "../assets/MarketplaceProfileLogo.png";

const Header = () => {
  return (
    <div className="header-container">
      <div className="logo">
        <Link to="/">
          <h2>Crowleys Column</h2>
        </Link>
      </div>
      <div className="profile-logo">
          <img
            className="profilebutton"
            src={profile_img}
            alt="Profile Button"
          />
        </div>
      <div className="header-topics">
        <Link to="/articles">
            <p>All Articles</p>
        </Link>
        <Link to="/articles?topic=coding">
            <p>Coding</p>
        </Link>
        <Link to="/articles?topic=football">
            <p>Football</p>
        </Link>
        <Link to="/articles?topic=cooking">
            <p>Cooking</p>
        </Link>
      </div>
      {/* <div className="searchBar">
        <input type="text" placeholder="Search Articles" id="search-bar" />
      </div> */}
    </div>
  );
};

export default Header;
