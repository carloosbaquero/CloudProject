import React, {useState} from 'react';
import { useEffect } from 'react';

import Header from '../components/Header';
import Post from '../components/Post';
import styled from 'styled-components'
import axios from 'axios'
import { M_CONTENT } from '../api/ContentHost';
import { M_USERS } from '../api/UsersHost';
import { useLocalStorage } from '../components/Login';

function listPosts() {
    

    const [content, setContent] = useState([])
    useEffect(() => {
        fetch(M_CONTENT + "api/contents/users")
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
    
    const getAccessToken = JSON.parse(sessionStorage.getItem('accessToken')) || ''
    const getRefreshToken = JSON.parse(sessionStorage.getItem('refreshToken')) || ''
    const getLoginName = JSON.parse(sessionStorage.getItem('loginName')) || ''

    

    if(getAccessToken){
        const [accessToken, setAccessToken] = useLocalStorage('accessToken', null)
        useEffect( () => {

            const myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/json')
    
            const raw = JSON.stringify({
                name: getLoginName,
                accessToken: getAccessToken,
                refreshToken: getRefreshToken
            })
    
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            }
    
            fetch(M_CONTENT + 'api/users/token', requestOptions)
                .then(response => response.json())
                .then(result => {if(result.expired){setAccessToken(result.token)}})
                .catch(error => console.log('error', error))
        }, [])
    }

    
    
    const posts = listPosts()

    return (
        <Div>
            <Div>
                <Header/>
            </Div>
            
            <DivPost>
                {posts.length === 0 ? (
                    <div className='SignIn'>
                        <div className='auth-form-container'>
                            <h2>No post uploaded</h2>
                        </div>  
                    </div>

                    ) : (
                    <div>
                    {posts.map(item => (
                        <div key={item.id}>
                        <Post id={item.id} type={item.contentType} name={item.name} userId={item.userId} username={item.userName} profilePicture={item.profilePicture} profileURL={item.profilePublicURL} description={item.description} image={item.publicURL} createdAt={item.createdAt} updateAt={item.updateAt} test={false} proUser={item.proUser}/>
                        </div>
                    ))}
                    </div>
                )}
                
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
    

