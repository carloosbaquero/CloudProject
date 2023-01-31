import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { M_CONTENT } from "../../api/ContentHost";
import { M_USERS } from "../../api/UsersHost";
import { useLocalStorage } from "../Login";
import Post from "../Post";


export default function Post_Form() {

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

    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [imageName, setImageName] = useState('')
    const [file, setFile] = useState(null)

    const [succesDB, setSuccesDB] = useState(false)
    const [succesBuck, setSuccesBuck] = useState(false)

    const [error, setError] = useState(false)

    const [isPro, setIsPro] = useState(false)
    useEffect(() => {
        fetch(M_CONTENT + "api/users", {headers: {'Authorization': 'Bearer ' + getAccessToken}})
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
                const res = await axios.post( M_CONTENT + 'api/images', {name: imageName, description: description})
                console.log(res.status)
                if (res.status === 201){
                    setSuccesDB(true)
                }
            }catch(err){
                console.log(err)
                if (err.response.status === 404){
                    alert('Content not found')
                } else if(err.response.status === 403) {
                    alert('User dont owe content')
                } else if(err.response.status === 500){
                    setError(true)
                }
            }
    
            try{
                let formData = new FormData();
                formData.append('newFile', file)
                const res = await axios.post( M_CONTENT + 'api/images/file', formData)
                if (res.status === 201){
                    setSuccesBuck(true)
                }
            }catch(err){
                console.log(err)
                if(err.response.status === 500){
                    setError(true)
                }
    
            }
        }else if(imageName.slice(-1) === '4'){
            try{
                const res = await axios.post( M_CONTENT + 'api/videos', {name: imageName, description: description})
                console.log(res.status)
                if (res.status === 201){
                    setSuccesDB(true)
                }
            }catch(err){
                console.log(err)
                if (err.response.status === 404){
                    alert('Content not found')
                } else if(err.response.status === 403) {
                    alert('User dont owe content')
                }else if(err.response.status === 500){
                    setError(true)
                }
            }
    
            try{
                let formData = new FormData();
                formData.append('newFile', file)
                const res = await axios.post(M_CONTENT + 'api/videos/file', formData)
                if (res.status === 201){
                    setSuccesBuck(true)
                }
            }catch(err){
                console.log(err)
                if(err.response.status === 500){
                    setError(true)
                }
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
                {error && (
                <h5 className='error'>Change the name of the file and try it again</h5>
                )}
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