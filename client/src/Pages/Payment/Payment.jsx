import React, { useContext, useState } from 'react';
import LayOut from '../../component/Layout/LayOut';
import classes from "./Payment.modue.css"
import { DataContext } from '../../component/DataProvider/DataProvider';
import ProductCard from '../../component/product/productCard'
import {useStripe, useElements,CardElement} from '@stripe/react-stripe-js';
import { red } from '@mui/material/colors';
import CurrencyFormat from '../../component/CurrencyFormat/CurrencyFormat';
import { useNavigate } from 'react-router-dom';
import { db } from '../../utility/fireBase';
import { Type } from '../../utility/action.type';
import axiosInstance from '../../Api/axios';
import {BeatLoader} from "react-spinners"

const Payment = () => {
    const [{ basket ,user },dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const totalPrice =basket.reduce((amount,item)=>{
    return item.price * item.amount +amount},0) 
    const stripe = useStripe();
    const elements = useElements();
    const navigate=useNavigate()
    
    const [cardError, setCardError]=useState('')
    const [processing,setProcessing] = useState(false)
  const handleChange=(e) =>{
    // console.log(e.error.message)
    e?.error?.message? setCardError(e?.error?.message):setCardError('')
  }
  const handlePayment = async(e) =>{
    e.preventDefault();
    try{
        setProcessing(true);
        //backend function contact to the client secret
        const response= await axiosInstance({
            method:"POST",
            url:`/payment/create?total=${totalPrice*100}`
        })
        const clientSecret = response.data?.clientSecret
        // client side configuration
        const {paymentIntent} =await stripe.confirmCardPayment(
            clientSecret,{
                payment_method:{
                    card:elements.getElement(CardElement)
                }
            }
        );
        // after the configuration order fireBase database save,clear basket
                await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id).set({
                    basket:basket,
                    amount:paymentIntent.amount,
                    created:paymentIntent.created,
                })

                // empty the basket 
                dispatch({
                    type:Type.EMPTY
                })
                setProcessing(false);
                navigate("/order",{
                    state:{msg:"you have placed new order"}
                })

    }catch(error){
        console.log(error)
        setProcessing(false)
    }
  }
    return (
        <LayOut>
            {/* header */}

            <div className='payment_header'><p>Checkout({totalItem}) items</p>
            </div>
            {/* payment method section */}
            <section className='payment'>
                {/* address */}
                <div className='flex'>
                    <h3>
                        Delivery Address
                    </h3>
                    <div>
                        <div>{user.email}</div>
                        <div>Africa Avenue street</div>
                        <div>Addis Abeba,Ethiopia</div>
                    </div>
                </div>
                <hr/>
                {/* product */}
                <div className='flex'>
                    <h3>Review items and Delivery</h3>
                    <div>
                        {
                            basket?.map((item)=><ProductCard product={item} flex ={true}/>)
                        }
                    </div>
                </div>
                <hr/>
                {/* card form */}
                <div className='flex'>
                    <h3>Payment methods</h3>
                    <div className='payment_card_container'>
                        <div className='payment_details'>
                            <form onSubmit={handlePayment}>
                                {/* smart card form stripe  */}
                                {
                                    // error
                                    cardError&&<small style={{color:"red"}}>{cardError}</small>
                                }
                                {/* card */}
                                <CardElement onChange={handleChange}/>
                                {/* price */}
                                <div className='Payment_price'>
                                    <div>
                                        <span>
                                            Total order|<CurrencyFormat amount={totalPrice}/>
                                        </span>
                                    </div>
                                    <button type='submit'>
                                    {
                                        processing?(
                                        <div className='loading'><BeatLoader color="gray" size={12} />
                                        <p>please wait ......</p>
                                        </div>):("Pay Now ")
                        }
                                        </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </section>
        </LayOut>
    );
}

export default Payment;
