import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../Post";


export default function Post_Form() {

    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const handleImage = (e) => {
        const file = e.currentTarget.files[0]
        const url = URL.createObjectURL(file)
        console.log(file)
        console.log(url)
        setImage({url,
            file})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(image);
        console.log(description)
    }

    const navigate = useNavigate();
 
        const handleClick = () => {
            navigate('/');
        } 

    return (
        <div className="SignIn">
            <div className="auth-form-container">
            <div className="logo">
                <h2 className="border">Free Space</h2>
                <h2 className="wave">Free Space</h2>
            </div>
            <h2 className='tittle'>Upload Post</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                {/* INPUT DESCRIPTION */}
                <label htmlFor="description">description</label>
                <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description" id="description" name="description"/>
                
                {/* INPUT IMAGES */}
                <label htmlFor="image">Select Image or Video:</label>
                <input onChange={(e) => handleImage(e)} placeholder="image" id="image" name="image" type="file" accept='.jpg, .jpeg, .png' required></input>

                {/* SEND IMAGES TO BACKEND */}
                <div>
                <button type="submit">Upload Post </button>
                </div>
            </form>
            <button className="link-btn" onClick={handleClick}>Go Back </button>
        </div>
      {/* VIEW POST */}
      {image == '' && <Post image={image} nickname='User' description={description}/>}
      {image != '' && <Post image={image.url} nickname='User' description={description}/>}
    </div>
    );

}