import React from "react";
import { useNavigate } from "react-router-dom";
import "./Post.css";
import emptyContent from '../../public/emptyContent.jpg'
import emptyAvatar from '../../public/emptyAvatar.png'


const Post = (props) => {    
    const navigate = useNavigate();

    const proUser = props.proUser

    const test = props.test

    const id = props.id;

    const name = props.name

    const username = props.username;

    const description = props.description;

    const profilepicture= props.profilePicture;
    

        let profileURL = emptyAvatar
        if(profilepicture!==null){
            profileURL = props.profileURL
        }

    

    const image = props.image;


    const handleClicked = () => {
        navigate(`/comments/${id}`)
    }

    return (
    <div className="Back">

    
    <article className="Post">

        <header className="head">

            <div className="Post-user">

            <div className="Post-user-profilepicture">
                <img src={profileURL} alt={profilepicture}/>
            </div>

            <div className="Post-user-nickname">

                <span>{username}</span>

            </div>

            </div>

        </header>
        <div className="Post-image">

            <div className="Post-image-bg">

            
            {image === '' && <img alt={name} src={emptyContent}/> }
            {name.slice(-1) !== '4' && image !== '' && <img alt={name} src={image}/>}
            {name.slice(-1) === '4' && <video style={{width: '100%'}} autoPlay loop alt={name} src={image} type="video/mp4"/>} 

            </div>

        </div>

        <div className="Post-caption">

            <strong>{username} </strong> {description}
            
           

        </div>

        {proUser && !test &&
        <div className="end">
            <button onClick={handleClicked} type="button" className="buttonComments" ><strong className="comments">comments...</strong></button>
        </div>
        }
    </article>
    </div>
    );

    

}

export default Post;