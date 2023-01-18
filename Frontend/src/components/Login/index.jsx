import React, {useState} from 'react'
import './Login.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'


// function login(name, pass) {
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     const raw = JSON.stringify({
//         "name": name,
//         "password": pass,
//     });

//     return {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//     };
// }






export const Login = (props) => {

    const navigate = useNavigate();

    const [tokens, setTokens] = useState(null)

    const [error, setError] = useState(null)

    const [name, setUsername] = useState('')
    const [password, setPass] = useState('')


    const refreshToken = async () => {
        try{
            const res = await axios.post("http://localhost:3002/token", { token: tokens.refreshToken})
            setTokens({
                ...tokens,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken
            })
            return res.data
        }catch(err){
            console.log(err)
        }
    }
    
    const axiosJWT = axios.create()

    axiosJWT.interceptors.request.use( async (config) => {
        let currentDate = new Date();
        const decodedToken = jwt_decode(tokens.accessToken);
        if(decodedToken.exp *1000 < currentDate.getTime()){
            const data = await refreshToken()
            config.headers["authorization"] = "Bearer " + data.accessToken
        }
        return config   
    }, (error) => {
        return Promise.reject(error)
    })

    

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log(name);

        try{
            const res = await axios.post("http://localhost:3002/users/login", {name, password})
            setTokens(res.data)
            console.log(res.data.accessToken)
        }catch(err){
            setError(err.response.status)
            console.log(err.response.status)
        } 
    }

    const handleClicked = async () => {
        accessToken = tokens.accessToken
        refreshToken = tokens.refreshToken
        navigate('/')
    }
    
    return (
        
        <div className="auth-form-container">
            {tokens ? (
                <div>
                    <h2>You have succesfully logged</h2>
                    <button className='link-btn' onClick={handleClicked}>Go To Free Space</button>
                </div>
            ) : (
            <div>
            <div className="logo">
                <h2 className="border">Free Space</h2>
                <h2 className="wave">Free Space</h2>
            </div>
            <h2 className='tittle'>Log In</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="name">username</label>
                <input value={name} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="username" id="username" name="username"/>
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="**********" id="password" name="password"/>
                <button type="submit">Log In</button>
            </form>
            {error===404 && (
            <h5 className='error'>User does not exist</h5>
            )}
            {error===403 && (
            <h5 className='error'>Invalid password</h5>
            )}
            {error===401 && (
            <h5 className='error'>Introduce all the data</h5>
            )}
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
            </div>)}
        </div>
    )
}





