import { createContext, useState } from "react"
import { useReducer } from "react"
import AuthReducer from "./AuthReducer";
import { useEffect } from "react";
const INITIAL_STATE = {
    user:null,
    isFetching:false,
    error:false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    console.log(state)
    // localStorage.setItem('user', state.user)

    useEffect(()=>{
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            dispatch({ type: 'UPDATE_USER', payload: storedUser });
        }
    },[])

    

    return (
        <AuthContext.Provider value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch,
        }}>
            {children}

        </AuthContext.Provider>
    )
}