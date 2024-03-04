import React, { useEffect, useState } from 'react';
import LayOut from '../../component/Layout/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import classes from "./Results.module.css"
import ProductCard from '../../component/product/productCard';
import Loader from "../../component/Loader/Loader"


const Results = () => {
    const [results,setResults]=useState([])
    const[isLoading,setisLoading] = useState(false)
    const {catagoryName}=useParams();
    // console.log(catagoryName)
    useEffect(() => {
        setisLoading(true)
        axios.get(`${productUrl}/products/category/${catagoryName}`).then((res)=>{
            setResults(res.data)
             setisLoading(false)
        }).catch((err)=>{
            console.log(err)
            setisLoading(false)
        })
    }, [])
    
    return (
        <LayOut>
            <section>
                <h1 style={{padding:"30px"}}>Results</h1>
                <p tyle={{padding:"30px"}}>catagory / {catagoryName}</p>
                <hr/>
                {isLoading?(<Loader/>):(<div className={classes.products_container}>
                    {
                        results.map((product)=>(<ProductCard key={product.id} product={product}
                        renderAdd={true}
                        renderDesc={false}/>))
                    }
                </div>)}
                
            </section>
        </LayOut>
    );
}

export default Results;
