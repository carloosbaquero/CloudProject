import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import "./Header.css";
import styled from 'styled-components'
import {M_USERS} from '../../api/UsersHost.jsx'
import { M_CONTENT } from "../../api/ContentHost";



    
 

const Header = () => {

    const [accessToken, setAccessToken] = useState(()=>{
        const saved = sessionStorage.getItem("accessToken");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    })

    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        const navigate = useNavigate();
 
        const handleClickUpload = () => {
            accessToken ? (
                navigate('/upload')
            ) : (
                alert('You need to log in')
            )   
        } 



        const handleClickSignIn = async () => {
            if(accessToken){
                try{
                    const res = await axios.delete(M_CONTENT + "api/users/logout")
                    if (res.status === 204){
                        console.log("Prueba")
                        sessionStorage.removeItem('accessToken')
                        sessionStorage.removeItem('refreshToken')
                        console.log(accessToken)
                        
                    }
                    
                }catch(err){
                    console.log(err)
                    console.log(err.response.status)
                } 
            }      
            navigate('/signin')
        } 

        const handleClickPro = async () => {
            if(accessToken){
                try{ 
                    const res = await axios.put(M_CONTENT + "api/users/check")
                    console.log(res)
                    if (res.data === 'User is still pro'){
                        alert('You are already a ProUser')
                        
                    }else if(res.data === 'User is not pro') {
                        navigate('/prouser')
                    }else if(res.data === 'User is no longer pro') {
                        navigate('/prouser')
                    }
                }catch(err){
                    console.log(err)
                    if(err.response.status === 403){
                        alert('You are already a Pro User')
                    }
                } 
            }else{
                alert('You need to log in')
            }  
            
        }

        const handleClickEdit = () => {
            accessToken ? (
                navigate('/profile')
            ) : (
                alert('You need to log in')
            )  
        } 


        return (
            <header className="header">
                <div className="logo">
                    <h2 className="border">Free Space</h2>
                    <h2 className="wave">Free Space</h2>
                </div>
                
                <div className="buttons">

                <nav className="uploadbutton">
                <Button onClick={handleClickPro}>
                    Get ProUser
                </Button>
                </nav>

                <nav className="uploadbutton">
                <Button onClick={handleClickEdit}>
                    Edit Profile
                </Button>
                </nav>

                <nav className="uploadbutton">
                <Button onClick={handleClickUpload}>
                    Upload Post
                </Button>
                </nav>

                <nav className="uploadbutton">
                {accessToken ? (
                <Button onClick={handleClickSignIn}>
                    Log out
                </Button>
                ) : (
                <Button onClick={handleClickSignIn}>
                    Sign In
                </Button>
                )}
                </nav>
                </div>
                
            
            </header>
        );   
}

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  border-color: white;
  margin: 10px 0px;
  cursor: pointer;
  &:disabled {
    color: grey;
    opacity: 0.7;
    cursor: default;
  }
`;

export default Header;