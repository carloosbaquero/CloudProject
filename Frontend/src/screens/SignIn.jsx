import React from 'react';
import { useState } from 'react';
import { Login } from '../components/Login';
import {Register} from '../components/Register';


export const SignIn = () => {

    const [user, setUser] = useState(null)

    const login = () => {
      setUser({
        id:1,
        name: "Admin"
      })
    }
  
    const logout = () => setUser(null)

    const [currentForm, setCurrentForm] = useState('login');

    const toggleform = (formName) => {
        setCurrentForm(formName);
    }

    return (
        <div className='SignIn'>
            {currentForm === 'login'? <Login onFormSwitch={toggleform}/> : <Register onFormSwitch={toggleform}/>}
            
        </div>
    );
}
