import React from 'react';
import {catagoryInfo} from "./catagoryFullInfo"
import CatagoryCard from "./CatagoryCard";
import classes from "./category.module.css"
const Catagory = () => {
    return (
        // map the information from catagory info to the catagory card 
        <section className={classes.catagory_container}>
            {
                catagoryInfo.map((info)=>(
                    <CatagoryCard data = {info}/>
                ))
            }
        </section>
    );
}

export default Catagory;
