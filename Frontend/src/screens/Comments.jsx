import { useParams } from 'react-router';
import { Comment } from '../components/Comment';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { M_CONTENT } from '../api/ContentHost';
import axios from 'axios'
import emptyAvatar from '../public/emptyAvatar.png'

function listInfoPost(contentId) {
    const [infoPost, setInfoPost] = useState([])
    useEffect(() => {
        fetch(M_CONTENT + "/contents/" + contentId)
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
        fetch(M_CONTENT + "/comments/content/" + contentId)
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

    const [accessToken, setAccessToken] = useState(()=>{
        const saved = sessionStorage.getItem("accessToken");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    })

    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    
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


    const handleSubmit = async (e) => {

        e.preventDefault();

        try{
            const res = await axios.post(M_CONTENT + "/comments", {"text": text, "contentId": parseInt(id)})
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
                    <Comment username={item.name} profileURL={item.profileURL}  text={item.text}/>
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