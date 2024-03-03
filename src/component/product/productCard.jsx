import React, { useContext } from 'react';
import Rating from "@mui/material/Rating"
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat"
import classes from "./product.module.css"
import { Link } from 'react-router-dom';
import {DataContext} from "../DataProvider/DataProvider"
import {Type} from "../../utility/action.type.js"
const ProductCard = ({product , flex ,renderDesc,renderAdd}) => {
    const {image,title,id,price,rating,description}=product
    const [state , dispatch] = useContext(DataContext)
    console.log(state)
    const addToCart = ()=>{
        dispatch({
            type:Type.ADD_TO_BASKET,
            item :{
                image,title,id,price,rating,description
            }
        })
    }
    return (
        <div className={`${classes.card_container} ${flex?classes.product_flexed : ''}`}>
            <Link to={`/products/${id}`}>
                <img src={image} alt=''/>
            </Link>
            <div> <h3>{title}</h3>
            {renderDesc && <div style={{maxWidth:"750px"}}>{description}</div>}
                <div className={classes.rating}>
                {rating && (
                        <>
                            {/* rating */}
                            <Rating value={rating.rate} precision={0.1} />
                            {/* rating counter*/}
                            <small>{rating.count}</small>
                            {/* quantity */}
                            {/* <small>Quantity: {item.amount}</small> */}
                        </>
                    )}
                </div>
                <div>
                    {/* price */}
                    <CurrencyFormat amount={price}/>
                </div>
                {
                    renderAdd && <button className={classes.button} onClick={addToCart} >Add To Cart</button>
                }
                
            </div>
        </div>
    );
}

export default ProductCard;
