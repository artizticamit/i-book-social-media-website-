import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


export const useLogout = ()=>{
    const {dispatch} = useContext(AuthContext)
    const logout = ()=>{
        localStorage.removeItem('user');
        dispatch({type:'LOGOUT'})
    }
    return {logout}
}