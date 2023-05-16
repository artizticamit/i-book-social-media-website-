import { createContext } from "react"
import { useReducer } from "react"
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
    user:{
        "_id":"6460f411405a21f13797d39f",
        "username":"tima",
        "email":"tima@gmail.com",
        "profilePicture":"",
        "coverPicture":"",
        "followers":[],
        "followings":["61ecdc3e19c3ac8008b995ce"],
    },
    isFetching:false,
    error:false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

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