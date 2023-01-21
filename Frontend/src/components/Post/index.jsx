import React from "react";
import { useNavigate } from "react-router-dom";
import "./Post.css";

const IsImage = (image) => {
    let res = false
    const array = image.toString().split('.')
    const extension = array[array.length -1]
    if(extension == 'jpeg' || extension == 'jpg'|| extension == 'png'){
        res = true
    }
    return res
}


const Post = (props) => {
    
    const navigate = useNavigate();

    const id = props.id;

    const name = props.name

    const username = props.username;

    //const description = this.props.description;

    const description = props.description;

    
    const profilepicture= props.profilePicture;
    

        let profileURL = 'https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png'
        if(profilepicture!==null){
            profileURL = props.profileURL
        }

    

    const image = props.image;


    const handleClicked = () => {
        navigate('/comments/' + {id})
    }

    return (
    <div className="Back">

    
    <article className="Post">

        <header className="head">

            <div className="Post-user">

            <div className="Post-user-profilepicture">

                {/* <img src="https://t4.ftcdn.net/jpg/02/19/63/31/360_F_219633151_BW6TD8D1EA9OqZu4JgdmeJGg4JBaiAHj.jpg" alt="John D. Veloper" /> */}
                <img src={profileURL} alt={profilepicture}/>

            </div>

            <div className="Post-user-nickname">

                <span>{username}</span>

            </div>

            </div>

        </header>
        <div className="Post-image">

            <div className="Post-image-bg">

            
            {image == '' && <img alt={name} src="https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"/> }
            <img alt={name} src={image}/>
            {/* {IsImage(image) && <img alt={nickname} src={image}/>}
            {!IsImage(image) && <video alt={nickname} src={image} type="video/mp4"/>} */}

            </div>

        </div>

        <div className="Post-caption">

            <strong>{username} </strong> {description}
            
           

        </div>
        
        <div className="end">
                <button onClick={handleClicked} type="button" className="buttonComments" ><strong className="comments">comments...</strong></button>
            </div>

    </article>
    </div>
    );

    

}

export default Post;