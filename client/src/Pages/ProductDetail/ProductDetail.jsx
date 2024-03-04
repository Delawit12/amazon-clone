import React, { useEffect, useState } from 'react';
import LayOut from '../../component/Layout/LayOut';
import { useParams } from 'react-router-dom';
import Loader from "../../component/Loader/Loader"
import axios from 'axios';
import {productUrl} from "../../../src/Api/endPoints.js"
import ProductCard from "../../component/product/productCard"


const ProductDetail = () => {
    const [product ,setProduct] = useState({})
    const[isLoading,setisLoading] = useState(false)
    const {productId} = useParams();
    // console.log(productId)
    useEffect(() => {
        setisLoading(true)
        axios.get(`${productUrl}/products/${productId}`).then((res)=>{
            // console.log(res)
            setProduct(res.data)
            setisLoading(false)
        }).catch((err)=>{
            console.log(err)
            setisLoading(false)
        })
    }, [])
    return (
        <LayOut>
            {isLoading ? (<Loader/>):(  <ProductCard product={product} flex={true}
            renderDesc={true}
            renderAdd={true}/>)}
          
        </LayOut>
    );
}

export default ProductDetail;
