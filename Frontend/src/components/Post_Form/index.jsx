import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { M_CONTENT } from "../../api/ContentHost";
import { M_USERS } from "../../api/UsersHost";
import Post from "../Post";


export default function Post_Form() {

    const [accessToken, setAccessToken] = useState(()=>{
        const saved = sessionStorage.getItem("accessToken");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    })

    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [imageName, setImageName] = useState('')
    const [file, setFile] = useState(null)

    const [succesDB, setSuccesDB] = useState(false)
    const [succesBuck, setSuccesBuck] = useState(false)

    const [isPro, setIsPro] = useState(false)
    useEffect(() => {
        fetch(M_USERS + "/users", {headers: {'Authorization': 'Bearer ' + accessToken}})
        .then(
            response => response.json()
        ).then(
            data => {setIsPro(data.proUser)}
        ).then(
            error => console.log(error)
        )
    }, [])


    const handleImage = (e) => {
        setImageName(e.currentTarget.files[0].name)
        setFile(e.currentTarget.files[0])
        const file2 = e.currentTarget.files[0]
        const url = URL.createObjectURL(file2)
        console.log(file)
        setImage({url,
            file})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (imageName.slice(-1) !== '4' && image !== ''){
            try{
                const res = await axios.post(M_CONTENT + '/images', {name: imageName, description: description})
                console.log(res.status)
                if (res.status === 201){
                    setSuccesDB(true)
                }
            }catch(err){
                console.log(err)
                if (err.status === 404){
                    alert('Content not found')
                } else if(err.status === 403) {
                    alert('User dont owe content')
                }
            }
    
            try{
                let formData = new FormData();
                formData.append('newFile', file)
                const res = await axios.post(M_CONTENT + '/images/file', formData)
                if (res.status === 201){
                    setSuccesBuck(true)
                }
            }catch(err){
                console.log(err)
    
            }
        }else if(imageName.slice(-1) === '4'){
            try{
                const res = await axios.post(M_CONTENT + '/videos', {name: imageName, description: description})
                console.log(res.status)
                if (res.status === 201){
                    setSuccesDB(true)
                }
            }catch(err){
                console.log(err)
                if (err.status === 404){
                    alert('Content not found')
                } else if(err.status === 403) {
                    alert('User dont owe content')
                }
            }
    
            try{
                let formData = new FormData();
                formData.append('newFile', file)
                const res = await axios.post(M_CONTENT + '/videos/file', formData)
                if (res.status === 201){
                    setSuccesBuck(true)
                }
            }catch(err){
                console.log(err)
    
            }
        }
    }

    const navigate = useNavigate();
 
        const handleClick = () => {
            navigate('/');
        } 

    return (
    <div className="SigInr">
        {succesDB && succesBuck ? (
            <div className="auth-form-container">
                <h1>You succesfully posted</h1>
                <button className="link-btn" onClick={handleClick}>Go Back </button>
            </div>
        ) :(

        <div>
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
                {!isPro && <input onChange={(e) => handleImage(e)} placeholder="image" id="image" name="image" type="file" accept='.jpg, .png' required></input>}
                {isPro && <input onChange={(e) => handleImage(e)} placeholder="image" id="image" name="image" type="file" accept='.jpg, .png, .mp4' required></input>}

                {/* SEND IMAGES TO BACKEND */}
                <div>
                <button type="submit">Upload Post </button>
                </div>
            </form>
            <button className="link-btn" onClick={handleClick}>Go Back </button>
        </div> 
      {/* VIEW POST */}
      {image === '' && <Post image={image} name={imageName} description={description} test={true}/>}
      {image !== '' && <Post image={image.url} name={imageName} description={description} test={true}/>}
    </div>)}
    </div>
    );

}