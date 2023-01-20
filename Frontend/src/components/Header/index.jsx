import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { useLocalStorage } from "../Login";
import "./Header.css";
import styled from 'styled-components'



    
 

const Header = () => {

    const [accessToken, setAccessToken] = useState(()=>{
        const saved = localStorage.getItem("accessToken");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    })

    // const [accessToken, setAccessToken] = useLocalStorage('accessToken', null)
    // const [refreshToken, setRefreshToken] = useLocalStorage('refreshToken', null)


    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        const navigate = useNavigate();
 
        const handleClickUpload = () => {
            navigate('/upload');
        } 



        const handleClickSignIn = async () => {
            if(accessToken!==null){
                try{
                    
                    const res = await axios.delete("http://localhost:3002/users/logout")
                    if (res.status === 204){
                        console.log("Prueba")
                        localStorage.removeItem('accessToken')
                        localStorage.removeItem('refreshToken')
                        console.log(accessToken)
                        
                    }
                    
                }catch(err){
                    console.log(err)
                    console.log(err.response.status)
                } 
            }      
            navigate('/signin')
        } 


        return (
            <header className="header">
                <div className="logo">
                    <h2 className="border">Free Space</h2>
                    <h2 className="wave">Free Space</h2>
                </div>
                
                <div className="buttons">
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