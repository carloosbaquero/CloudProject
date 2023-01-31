import axios from 'axios';
import React, {useState} from 'react'
import { M_CONTENT } from '../../api/ContentHost';
import { M_USERS } from '../../api/UsersHost';
import './Register.css'

export const Register = (props) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [name, setName] = useState('')
    const [succes, setSucces] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(email !== '' && pass !== '' && name !== '' ){
            try{
                const res = await axios.post(M_CONTENT + "api/users", {"name": name, "password": pass, "email": email})
                if (res.status === 201){
                    setSucces(true)
                }
                console.log(res)
            }catch(err){
                setSucces(false)
                console.log(err.response.status)
                setError(err.response.status)
            }
        }else {
            setError(1)
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
                {succes && (
                <h5 className='success'>User has been registered</h5>
                )}
                {error === 1 && (
                <h5 className='error'>You need to fill all the form</h5>
                )}
                {error === 500 && (
                <h5 className='error'>This user already exist</h5>
                )}
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Log In here.</button>
        </div>
    )
}