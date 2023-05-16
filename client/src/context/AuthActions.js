export const LoginStart = (userCredentials)=>({
    type:"LOGIN_START",
});

export const LOGIN_SUCCESS = (user)=>({
    type:"LOGIN_SUCCESS",
    payload:user,
});

export const LOGIN_FAILURE = (error)=>({
    type: "LOGIN_FAILURE",
    payload:error,
});