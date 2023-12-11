import React from "react";
import profile_img from "../assets/MarketplaceProfileLogo.png"

const Header = () => {
    return (
        <div className="header-bar">
            <div className="logo">
                <h2>Crowleys Column</h2>
            </div>
            <div className="profileButton">
                <img className="profile-button" src={profile_img} alt="Profile Button" />
            </div>
            <div className="searchBar">
                <input
                type="text"
                placeholder="Search Articles" 
                id="search-bar"/>
            </div>
        </div>
    )
}

export default Header