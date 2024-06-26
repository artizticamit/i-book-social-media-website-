// import { Password } from '@mui/icons-material';
import axios from 'axios';
import { useState } from 'react';


export const loginCall = async (userCredentials, dispatch)=>{
    // const [error, setError] = useState(null)
    const path = "https://i-book-backend.onrender.com"
    const PATH = process.env.REACT_APP_PATH_TO_BACKEND || 'http://localhost:8000';
    // const path = "http://localhost:8000"
    dispatch({type:"LOGIN_START"});
    try{
        const res = await axios.post(`${PATH}/api/auth/login`,userCredentials);
        const {password, ...user} = res.data
        console.log(user)
        localStorage.setItem('user',JSON.stringify(res.data))
        dispatch({type:"LOGIN_SUCCESS",payload:res.data});
    }
    catch(err)
    {
        // console.log(err.response.data)
        dispatch({type:"LOGIN_FAILURE",payload:err.response.data});
    }
}