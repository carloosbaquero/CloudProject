import React, {useState} from 'react';
import { useEffect } from 'react';

import Header from '../components/Header';
import Post from '../components/Post';
import styled from 'styled-components'



function listCharacters() {
    

    const [characters, setCharacters] = useState([])
    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character")
        .then(
            response => response.json()
        ).then(
            data => {setCharacters(data.results); console.log(data.results)}
        ).then(
            error => console.log(error)
        )
    }, [])
    return characters
}


export const Home = () => {
    const [accessToken, setAccessToken] = useState(()=>{
        const saved = localStorage.getItem("accessToken");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    })
    
    
    const characters = listCharacters()

    return (
        <Div>
            <Div>
                <Header/>
            </Div>
            <DivPost>
                {characters.map(item => (
                    <div key={item.id}>
                    <Post id={item.id} nickname= {item.name} image = {item.image}/>
                    </div>
                ))}
            </DivPost>    
            
        </Div>
        
    );
}


const DivPost = styled.div`
  background-color: #09f;
  margin-top: 10px;
  margin-right: 0px;
  margin-left: 0px;
  margin-bottom: 0px;
`;
const Div = styled.div`
  background-color: #09f;
  margin-top: 0px;
  margin-right: 0px;
  margin-left: 0px;
  margin-bottom: 0px;
`;
    

