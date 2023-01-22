import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { M_USERS } from "../api/UsersHost";

export const Profile = () => {

    const [accessToken, setAccessToken] = useState(()=>{
        const saved = sessionStorage.getItem("accessToken");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    })

    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [successEmail, setSuccessEmail] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)

    const [image, setImage] = useState('')
    const [file, setFile] = useState(null)
    const [successProf, setSuccessProf] = useState(false)
    const [errorProf, setErrorProf] = useState('')

    const handleImage = (e) => {
        setFile(e.currentTarget.files[0])
        const file2 = e.currentTarget.files[0]
        const url = URL.createObjectURL(file2)
        console.log(file)
        setImage({url,
            file})
    }

    const handleSubmitEmail = async (e) => {
        e.preventDefault()
        try{ 
            console.log(email)
            const res = await axios.put(M_USERS + "/users", {"email": email})
            console.log(res)
            if (res.status === 204){
                setSuccessEmail(true)
            }
            
        }catch(err){
            setSuccessEmail(false)
            console.log(err)
            setErrorEmail(err.response.status)
        } 
    }

    const handleSubmitPicture = async (e) => {
        e.preventDefault();
        try{
            let formData = new FormData();
            formData.append('newFile', file)
            const res = await axios.post(M_USERS + '/profile', formData)
            if (res.status === 201){
                setSuccessProf(true)
            }
        }catch(err){
            setSuccessProf(false)
            console.log(err)
            setErrorProf(err.response.status)
        }
    }

    const handleDelete = async () => {
        try{ 
            const res = await axios.delete(M_USERS + "/users")
            console.log(res)
            if (res.status === 204){
                sessionStorage.removeItem('accessToken')
                sessionStorage.removeItem('refreshToken')
                navigate('/')
            }
            
        }catch(err){
            console.log(err)
        } 
    }

    const handleClicked = async () => {
        navigate('/')
    }

    return (
        <div className="SignIn">
        <div className="auth-form-container">
            <div className="logo">
                <h2 className="border">Free Space</h2>
                <h2 className="wave">Free Space</h2>
            </div>
            <h2 className='tittle'>Edit Profile</h2>
            <form className="register-form" onSubmit={handleSubmitEmail}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
                <button type='submit' className="buttonComments"><strong className="comments">Change your email</strong></button>
            </form>
            {successEmail && (
            <h5 className='success'>Email has been updated</h5>
            )}
            {!successEmail && errorEmail === 403 && (
            <h5 className='error'>Email can not be empty</h5>
            )}
            
            
            <form className="register-form" style={{marginTop: "70px"}} onSubmit={handleSubmitPicture}>
            <label htmlFor="image">Select a New Profile Picture:</label>
                <input onChange={(e) => handleImage(e)} placeholder="image" id="image" name="image" type="file" accept='.jpg, .png' required></input>
            
            <div>
            {image !== '' && (
            <div className="Post-user-profilepicture">
                <img src={image.url}/>
            </div>
            )}
            <button type='submit' className="buttonComments"><strong className="comments">Change your profile picture</strong></button>
            </div>
            {successProf && (
            <h5 className='success'>Profile Picture has been updated</h5>
            )}
            </form>
            

            <Button2 onClick={handleDelete}>
                    DELETE ACCOUNT
            </Button2>

            
            <button className='link-btn' onClick={handleClicked}>Go Back</button>
            
        </div>
        </div>
    );
}


const Button2 = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  border-color: white;
  margin: 100px;
  cursor: pointer;
  &:disabled {
    color: grey;
    opacity: 0.7;
    cursor: default;
  }
`;