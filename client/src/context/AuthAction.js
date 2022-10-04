export const LoginStart = (userCredentials)=>({
    type: "LOGIN_START",
})

export const LoginSuccess = (userCredentials)=>({
    type: "LOGIN_SCUCCESS",
    payload: userCredentials,
})

export const LoginFailure = (error)=>({
    type: "LOGIN_FAILURE",
    payload: error,
})

export const RegisterStart = (userCredentials)=>({
    type: "REGISTER_START",
})

export const RegisterSuccess = (userCredentials)=>({
    type: "REGISTER_SUCCESS",
    payload: userCredentials,
})

export const RegisterFailure = (error)=>({
    type: "REGISTER_FAILURE",
    payload: error,
})