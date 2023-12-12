import React from "react";
import { useNavigate } from "react-router";

const SeeAllButton = () => {
    const navigate = useNavigate();

    const handleSeeAllClick = () => {
        navigate('/articles')
    }

    return (
        <button className="see-all-button" onClick={handleSeeAllClick}>See More...</button>
    )
}

export default SeeAllButton