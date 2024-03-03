import React from 'react';
import classes from "./category.module.css";
import {Link} from "react-router-dom"
const CatagoryCard = ({data}) => {
    console.log(data)
    const {title,catagoryName,imgLink}=data;
    return (
        // destructure the array that comes from the catagory section 
        <div className={classes.catagory}>
           <Link to={`/category/${catagoryName}`}>
            <span>
                <h2>{title}</h2>
                
            </span>
            <img src={imgLink} alt=''/>
            <p>Shop now</p>
           </Link>
        </div>
    );
}

export default CatagoryCard;
