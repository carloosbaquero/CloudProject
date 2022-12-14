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
    const characters = listCharacters()

    return (
        <Div>
            <h2>
                <Header/>
            </h2>
            <Body>
                {characters.map(item => (
                    <div key={item.id}>
                    <Post id={item.id} nickname= {item.name} image = {item.image}/>
                    </div>
                ))}
            </Body>    
            
        </Div>
        
    );
}

const Body = styled.body`
  background-color: #09f;
 
`;
const Div = styled.div`
  background-color: #09f;
 
`;
    

