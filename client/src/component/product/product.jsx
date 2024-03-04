import React,{useEffect, useState} from 'react';
import axios from "axios"
import ProductCard from './productCard';
import classes from "./product.module.css";
import Loader from "../Loader/Loader"

const Product = () => {
    // initialize the products value as empty array first 
    const [products , setProducts] = useState([])
    const[isLoading,setisLoading] = useState(false)

    useEffect(()=>{
        setisLoading(true)
        axios.get("https://fakestoreapi.com/products")
            .then((res) => {
                setProducts(res.data);
                setisLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setisLoading(false)
            });
    },[])
    return (
        <>
        {
            isLoading ?(<Loader/>):(<section className={classes.product_container}>
        
                {
                    products.map((singleProduct)=>{
                        return <ProductCard product={singleProduct} key={singleProduct.id}
                        renderAdd={true}/>
                    })
                }
                
            </section>)
        }
        
        
        </>
    );
}

export default Product;
