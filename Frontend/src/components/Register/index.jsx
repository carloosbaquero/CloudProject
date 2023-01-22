import React, {useState} from 'react'
import { M_USERS } from '../../api/UsersHost';
import './Register.css'

function register(name, email, pass) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "name": name,
        "password": pass,
        "email": email
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(M_USERS + "/users", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

export const Register = (props) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [name, setName] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        console.log(name)
        console.log(pass)
        
        try{
            register(name, email, pass)
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className="auth-form-container">
            <div className="logo">
                <h2 className="border">Free Space</h2>
                <h2 className="wave">Free Space</h2>
            </div>
            <h2 className='tittle'>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">username</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="username" id="name" name="name"/>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="**********" id="password" name="password"/>
                <button type="submit">Register</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Log In here.</button>
        </div>
    )
}