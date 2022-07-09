import React, {useState, useEffect} from 'react'
import Axios from 'axios';


function login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginButton = (e)=>{
        e.preventDefault();
        if(email && password)
        {

            Axios.post('http://localhost:8000/api/auth/login', {email: email, password:password}, ).then((response)=>{
                console.log("Response = ", response);
                if(response.status==200)
                {
                    console.log("hello");
                }
            }).catch(err=>{
                console.log("error = ",err)
            })
        }else{
            Axios.get('http://localhost:8000/Error', {}.then(response=>{
                console.log(response);
            }));
        }
    }

    return (
        <div className='login-page'>
            <div className="right"></div>
            <div className="left">
                <form>
                    <input type="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder='Username'/>
                    <input type="password" name='password' onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password'/>
                    <button onClick={handleLoginButton}>Login</button>
                </form>
                <div className="signup">
                    <p>Don't have an accoount? <a href='/signup'>Sign Up</a></p>
                </div>
            </div>
            
        </div>
    )
}

export default login
