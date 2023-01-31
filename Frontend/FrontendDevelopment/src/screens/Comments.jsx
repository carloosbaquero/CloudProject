import { useParams } from 'react-router';
import { Comment } from '../components/Comment';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { M_CONTENT } from '../api/ContentHost';
import { M_USERS } from '../api/UsersHost';
import axios from 'axios'
import emptyAvatar from '../public/emptyAvatar.png'
import { useLocalStorage } from '../components/Login';

function listInfoPost(contentId) {
    const [infoPost, setInfoPost] = useState([])
    useEffect(() => {
        fetch( M_CONTENT + "api/contents/" + contentId)
        .then(
            response => response.json()
        ).then(
            data => {setInfoPost(data)}
        ).then(
            error => console.log(error)
        )
    }, [])
    return infoPost
}

function listComments(contentId) {
    const [comments, setComments] = useState([])
    useEffect(() => {
        fetch(M_CONTENT + "api/comments/content/" + contentId)
        .then(
            response => response.json()
        ).then(
            data => {setComments(data)}
        ).then(
            error => console.log(error)
        )
    }, [])
    return comments
}

export const Comments = () => {

    const navigate = useNavigate()

    const getAccessToken = JSON.parse(sessionStorage.getItem('accessToken')) || ''
    const getRefreshToken = JSON.parse(sessionStorage.getItem('refreshToken')) || ''
    const getLoginName = JSON.parse(sessionStorage.getItem('loginName')) || ''

    const [accessToken, setAccessToken] = useLocalStorage('accessToken', null)

    if(getAccessToken){
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

    

    axios.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken}`;
    
    const {id} = useParams()

    const [text, setText] = useState('')

    const info = listInfoPost(id)


    // if(info.length === 0){
    //     if(info.id === undefined){
    //         alert("No content exists with this id")
    //         useEffect(() => {
    //         navigate('/')
    //     }); 
    //     }
          
    // }

    const username = info.userName
    const description = info.description
    const profilePicture = info.profilePicture
    let profileURL = emptyAvatar

    if(profilePicture){
        profileURL = info.profileURL
    }

    const comments = listComments(id)
    console.log(comments)


    const handleSubmit = async (e) => {

        e.preventDefault();

        try{
            const res = await axios.post(M_CONTENT + "api/comments", {"text": text, "contentId": parseInt(id)})
            if(res.status === 201){
                window.location.replace('');
            }
        }catch(err){
            console.log(err)
            console.log(err.response.status)
        } 
    }

    const handleClick = () => {
        navigate('/')
    }

    return ( 
        <div className='Post'>
        <div className='auth-form-container'>
            <div className="logo">
                <h2 className="border">Free Space</h2>
                <h2 className="wave">Free Space</h2>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="comment">comment...</label>
            <div style={{marginLeft: 40}}>
                <Comment username={username} text={description} profileURL={profileURL}></Comment>
            </div>
            {comments.map(item => (
                    <div key={item.id}>
                    <Comment username={item.name} profileURL={item.profilePicture? item.publicURL : emptyAvatar}  text={item.text}/>
                    </div>
                ))}  
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="comment..." id="name" name="name" required/>
            
            <button type='submit' className="buttonComments"><strong className="comments">Add a comment</strong></button>
            <button className="link-btn" onClick={handleClick}>Go Back </button>
            </form>
        </div>
        </div>
    );
}