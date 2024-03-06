import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Landing from "./Pages/Landing/Landing"
import Auth from "./Pages/Auth/Auth"
import Payment from "./Pages/Payment/Payment"
import Order from "./Pages/Order/Order"
import Cart from "./Pages/Cart/Cart"
import Results from "./Pages/Results/Results"
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './component/protectedRoute/protectedRoute';
const stripePromise = loadStripe('pk_test_51OqNbEHyfccgzGD6gBVSyiT3NXm637fjKdZfhTLMt1jFHXWSSgXU3DBVvjdxX4V5q3x0CNqqdTeFe5Mug9DJ12qx008veIyWMc');

const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Landing/>}/>
                <Route path='/auth' element={<Auth/>}/>
                <Route path='/payment' element={
                    <ProtectedRoute msg={"you must login to pay"} redirect={"/payment"}>
                    <Elements stripe={stripePromise}><Payment/></Elements>
                    </ProtectedRoute>
                }/>
                <Route path='/order' element={<ProtectedRoute msg={"you must login to see orders"} redirect={"/order"}>
                <Order/>
                </ProtectedRoute>
                }/>
                <Route path='/category/:catagoryName' element={<Results/>}/>
                <Route path='/products/:productId' element={<ProductDetail/>}/>
                <Route path='/cart' element={<Cart/>}/>
            </Routes>
        </Router>
    );
}

export default Routing;
