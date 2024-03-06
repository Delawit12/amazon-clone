import React, { useContext, useState } from 'react';
import LayOut from '../../component/Layout/LayOut';
import classes from "./Auth.module.css"
import { Link,useNavigate,useLocation } from 'react-router-dom';
import {auth} from "../../utility/fireBase"
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import { DataContext } from '../../component/DataProvider/DataProvider'
import {BeatLoader} from "react-spinners"

const Auth = () => {
    const [email,setEmail] =useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const [loading,setLoading]=useState({signIn:false,
    signUp:false});
    const [{user},dispatch] = useContext(DataContext)
    const navigate =useNavigate();
    const navData = useLocation()
    // console.log(user)
    // console.log(email,password)
    const authHandler=async(e)=>{
        e.preventDefault()
        console.log(e.target.name)

        if(e.target.name === "signin"){
            // firebase authentication
            try {
                setLoading({...loading,signIn:true})
                const userInfo = await signInWithEmailAndPassword(auth, email, password);
                dispatch({
                    type: "SET_USER", // Assuming your type is "SET_USER"
                    user: userInfo.user
                });
                setLoading({...loading,signIn:false})
                navigate(navData?.state?.redirect||"/")
            } catch (error) {
                // console.log(error.message);
                setError(error.message);
                setLoading({...loading,signUp:false})
            }
        }else{
            try {
                setLoading({...loading,signUp:true})
                const userInfo = await createUserWithEmailAndPassword(auth, email, password);
                dispatch({
                    type: "SET_USER", // Assuming your type is "SET_USER"
                    user: userInfo.user
                });
                setLoading({...loading,signUp:false})
                navigate(navData?.state?.redirect||"/")
            } catch (error) {
                // console.log(error.message);
                setError(error.message);
                setLoading({...loading,signUp:false})
            }

        }
    }
        return(
        <section className={classes.login}>
            {/*  logo*/}
            <Link to='/'>
                <img src='https://pngimg.com/uploads/amazon/amazon_PNG1.png' alt=''/>
            </Link>
                {/* form  */}
                <div className={classes.login_container}>
                    <div>
                        {
                            navData?.state?.msg&&(
                                <small style={
                                    {
                                        padding:"5px",
                                        textAlign:"center",
                                        color:"red",
                                        fontWeight:"bold",
                                    }
                                }>{navData?.state?.msg}</small>
                            )
                        }
                    <h1>Sign In</h1>
                    <form action=''>
                        {/* E-mail */}
                    <div>
                        <label htmlFor='email'>E-mail</label>
                        {/* controlled input put get the state by using useState  */}
                        <input type='email' name='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    {/* Password */}
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' id='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div>                   
                    <button type='submit' name='signin' onClick={authHandler} className={classes.login_SignInButton}>
                        {
                            loading.signIn ?(<BeatLoader color="#eded93" size={15} />):("Sign In")
                        }
                        
                    </button>
                    </div>

                    </form>

                    {/* agreement  */}
                    <p>By Signing in you agree to the AMAZON FAKE CLONE condtions of use & sale. please see our policy Notice and our Interest based Ads notifie    </p>
                    {/* create your Amazon Account */}
                    <button type='submit' onClick={authHandler} name='signup' className={classes.login_registerButton}>
                    {
                            loading.signUp ?(<BeatLoader color="#d0d0ca" size={15} />):("Create Your Amazon Account")
                        }
                       
                    </button>
                    {
                        error && <small>{error}</small>

                    }
                    </div>
                
            </div>
           </section>
        );
}

export default Auth;
