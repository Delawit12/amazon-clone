import React, { useContext } from 'react';
import LayOut from '../../component/Layout/LayOut';
import ProductCard from '../../component/product/productCard';
import { DataContext } from '../../component/DataProvider/DataProvider';
import CurrencyFormat from '../../component/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import classes from "./Cart.module.css"
import { Type } from '../../utility/action.type';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const Cart = () => {
    const [{ basket,user }, dispatch] = useContext(DataContext);
    const total =basket.reduce((amount,item)=>{
        return item.price * item.amount +amount},0) 
        // console.log(basket)

        const increment =(item) =>{
            dispatch({
                type:Type.ADD_TO_BASKET,
                item
            })
        }
        const decrement =(id) =>{
            dispatch({
                type:Type.REMOVE_FROM_BASKET,
                id
            })
        }
    return (
        <LayOut>
            <section className={classes.container}>
                <div className={classes.cart_container}>
                    <h2>Hello</h2>
                    <h3>Your Shopping Basket</h3>
                    <hr/>
                    {
                        basket.length==0 ?(<p>Opps !No item in your cart </p>):(basket?.map((item,i)=>{
                            return  <section className={classes.cart_product}>
                                <ProductCard 
                            key={i}
                            product={item}
                            renderDesc={true}
                            renderAdd={false}
                            flex={true}
                            />
                            <div className={classes.btn_container}>
                                <button className={classes.btn} onClick={()=>increment(item)}><KeyboardArrowUpIcon size={30}/>
                                </button>
                                <span>{item.amount}</span>
                                <button className={classes.btn} onClick={()=>decrement(item.id)}>
                                    <KeyboardArrowDownIcon size={30}/>
                                </button>
                            </div>
                            </section>
                            
                        }))
                    }
                     
                </div>
                {
                    basket.length !== 0&&(
                        <div className={classes.subtotal}>
                            <div>
                                <p>Subtotal ({basket.length} items)</p>
                                <CurrencyFormat amount={total}/>
                            </div>
                            <span><input type='checkbox'/>
                            <small>This order contains a gift</small>
                            </span>
                            <Link to="/payment">Continue to checkout </Link>

                        </div>
                    )
                }
                <div></div>
            </section>
        </LayOut>
    );
}

export default Cart;
