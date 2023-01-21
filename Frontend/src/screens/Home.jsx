import React, {useState} from 'react';
import { useEffect } from 'react';

import Header from '../components/Header';
import Post from '../components/Post';
import styled from 'styled-components'
import axios from 'axios'



// function listCharacters() {
    

//     const [characters, setCharacters] = useState([])
//     useEffect(() => {
//         fetch("https://rickandmortyapi.com/api/character")
//         .then(
//             response => response.json()
//         ).then(
//             data => {setCharacters(data.results); console.log(data.results)}
//         ).then(
//             error => console.log(error)
//         )
//     }, [])
//     return characters
// }

function listPosts() {
    

    const [content, setContent] = useState([])
    useEffect(() => {
        fetch("http://localhost:3001/contents/users")
        .then(
            response => response.json()
        ).then(
            data => {setContent(data); console.log(data)}
        ).then(
            error => console.log(error)
        )
    }, [])
    return content
}




export const Home = () => {
    const [accessToken, setAccessToken] = useState(()=>{
        const saved = localStorage.getItem("accessToken");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    })

    

    // const listPosts = async () => {
    //     const [content, setContent] = useState([])
    //     try{
    //         const res = await axios.get('http://localhost:3001/contents/users')
    //         console.log(res)
    //         setContent(res.data)
    //         console.log(res.data)
    //     }catch(err) {
    //         console.log(err)
    //     }
    //     console.log(content);
    //     return content
    // }

    
    
    const posts = listPosts()
    return (
        <Div>
            <Div>
                <Header/>
            </Div>
            <DivPost>
                {posts.map(item => (
                    <div key={item.id}>
                    <Post id={item.id} type={item.contentType} name={item.name} userId={item.userId} username={item.userName} profilePicture={item.profilePicture} profileURL={item.profilePublicURL} description={item.description} image={item.publicURL} createdAt={item.createdAt} updateAt={item.updateAt}/>
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
    

