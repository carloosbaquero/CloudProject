import React from "react";
import {useNavigate} from 'react-router-dom'

import "./Header.css";
import styled from 'styled-components'



    
 

const Header = () => {

        const navigate = useNavigate();
 
        const handleClickUpload = () => {
            navigate('/upload');
        } 

        const handleClickSignIn = () => {
            navigate('/signin');
        } 


        return (
            <header className="header">
                <div className="logo">
                    <h2 className="border">Free Space</h2>
                    <h2 className="wave">Free Space</h2>
                </div>
                
                <div className="header">
                <nav className="uploadbutton">
                <Button onClick={handleClickUpload}>
                    Upload Post
                </Button>
                </nav>

                <nav className="uploadbutton">
                <Button onClick={handleClickSignIn}>
                    Sign In
                </Button>
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