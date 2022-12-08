import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../Post";

export default function Post_Form() {
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(image);
    }

    const navigate = useNavigate();
 
        const handleClick = () => {
            navigate('/');
        } 

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* INPUT DESCRIPTION */}
                <label htmlFor="description">description</label>
                <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description" id="description" name="description"/>
                
                {/* INPUT IMAGES */}
                <label htmlFor="description">Select Image or Video:</label>
                <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="image" id="image" name="image" type="file" accept='.jpg, .jpeg, .png' required></input>

                {/* SEND IMAGES TO BACKEND */}
                <div>
                <button type="submit">Post </button>
                </div>
            </form>
            <button onClick={handleClick}>Go Back </button>

      {/* VIEW POST */}
      <Post/>
    </div>
    );

}