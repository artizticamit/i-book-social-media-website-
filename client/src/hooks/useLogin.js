import axios from 'axios'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'


export const useLogin = ()=>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const {user, dispatch} = useContext(AuthContext);
    console.log(user);

    dispatch({type:'LOGIN_START'})
    const login = async(email, password)=>{
        setIsLoading(true);

        try{
            const res = await axios.post('http://localhost:8000/api/auth/login', {email:email, password:password})
            const {password, ...user} = res.data
            console.log(user)
            setIsLoading(false);
            setError(false);
            localStorage.setItem('user',JSON.stringify(res.data))
            dispatch({type:"LOGIN_SUCCESS",payload:res.data});

        }catch(err){
            setIsLoading(false);
            setError(err.response.data);
            dispatch({type:"LOGIN_FAILURE",payload:err.response.data});
        }
    }
    return {login, error, isLoading};
}