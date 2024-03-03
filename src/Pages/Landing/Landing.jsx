import React from 'react';
import LayOut from '../../component/Layout/LayOut';
import CarouselEffect from "../../component/Carousel/CarouselEffect.js";
import Catagory from "../../component/Catagory/catagory.jsx";
import Product from "../../component/product/product.jsx";

const Landing = () => {
    return (
        <LayOut>
            <CarouselEffect/>
            <Catagory />
            <Product />
        </LayOut>
    );
}

export default Landing;
