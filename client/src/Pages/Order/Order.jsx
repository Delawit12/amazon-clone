import React, { useContext, useEffect, useState } from 'react';
import LayOut from '../../component/Layout/LayOut';
import {db} from "../../utility/fireBase.js"
import classes from "./Order.module.css"
import { DataContext } from '../../component/DataProvider/DataProvider.jsx';
import ProductCard from '../../component/product/productCard.jsx';
const Order = () => {
    const[{user,dispatch}]=useContext(DataContext)
    const [orders,setOrders]=useState([])
    useEffect(() => {
        if(user){
db.collection("users").doc(user.uid).collection("orders").orderBy("created").onSnapshot((snapshot)=>{
    setOrders(
        snapshot.docs.map((doc)=>(
            {
                id:doc.id,
                data:doc.data()
            }
        ))
    )
})
        }else{
setOrders({})
        }
     }, [])
    return (
        <LayOut>
            <section className={classes.container}>
                <div className={classes.order}>
                    <h2>Your Order</h2>
                    {
                        orders.length==0&&<div>you don,t have orders yet</div>
                    }
                    <div>
                        {
                            orders?.map((eachOrders,i)=>{
                                return(
                                    <div key={i}>
                                        <hr/>
                                        <p>Order Id:{eachOrders?.id}</p>
                                        {
                                            eachOrders?.data?.basket?.map((order)=>{
                                                return (<ProductCard flex={true}
                                                product={order}
                                                key={order.id}/>)
                                            })
                                        }
                                    </div>


                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </LayOut>
    );
}

export default Order;
