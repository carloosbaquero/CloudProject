import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../Post";


export default function Post_Form() {

    const [accessToken, setAccessToken] = useState(()=>{
        const saved = localStorage.getItem("accessToken");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    })

    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const [succes, setSucces] = useState(false)

    const handleImage = (e) => {
        const file = e.currentTarget.files[0]
        const url = URL.createObjectURL(file)
        console.log(file)
        console.log(url)
        setImage({url,
            file})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:3001/images', {name: image, description: description})
            if (res.status === 204){
                setSucces(true)
            }
        }catch(err){
            console.log(err)
            if (err.status === 404){
                alert('Content not found')
            } else if(err.status === 403) {
                alert('User dont owe content')
            }
        }
        console.log(image);
        console.log(description)
    }

    const navigate = useNavigate();
 
        const handleClick = () => {
            navigate('/');
        } 

    return (
    <div className="SignIn">
        {succes ? (
            <div>
                <h1>You succesfully posted</h1>
            </div>
        ) :(

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
                <input onChange={(e) => handleImage(e)} placeholder="image" id="image" name="image" type="file" accept='.jpg, .png' required></input>

                {/* SEND IMAGES TO BACKEND */}
                <div>
                <button type="submit">Upload Post </button>
                </div>
            </form>
            <button className="link-btn" onClick={handleClick}>Go Back </button>
        </div> )}
      {/* VIEW POST */}
      {image == '' && <Post image={image} nickname='User' description={description}/>}
      {image != '' && <Post image={image.url} nickname='User' description={description}/>}
    </div>
    );

}