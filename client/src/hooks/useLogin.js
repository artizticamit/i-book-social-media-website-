import axios from 'axios'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'


export const useLogin = ()=>{
    const path = 'https://i-book-backend.onrender.com'
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const {user, dispatch} = useContext(AuthContext);
    console.log(user);

    dispatch({type:'LOGIN_START'})
    const login = async(email, password)=>{
        setIsLoading(true);

        try{
            const res = await axios.post(`${path}api/auth/login`, {email:email, password:password})
            const {password, ...user} = res.data
            console.log(user)
            setIsLoading(false);
            setError(false);
            localStorage.setItem('user',JSON.stringify(user))
            dispatch({type:"LOGIN_SUCCESS",payload:res.data});

        }catch(err){
            setIsLoading(false);
            setError(err.response.data);
            dispatch({type:"LOGIN_FAILURE",payload:err.response.data});
        }
    }
    return {login, error, isLoading};
}