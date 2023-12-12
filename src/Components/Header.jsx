import React from "react";
import { Link } from "react-router-dom"
import profile_img from "../assets/MarketplaceProfileLogo.png"

const Header = () => {
    return (
        <div className="header-bar">
            <div className="logo">
                <Link to="/">
                    <h2>Crowleys Column</h2>
                </Link>
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