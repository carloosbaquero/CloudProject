import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { M_USERS } from "../api/UsersHost";

export const ProUser = () => {

    const [accessToken, setAccessToken] = useState(()=>{
        const saved = sessionStorage.getItem("accessToken");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    })

    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    const navigate = useNavigate()

    const [numMonths, setNumMonths] = useState(3)
    const [success,setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{ 
            const res = await axios.put(M_USERS + "/users/pro", {"numMonths": parseInt(numMonths)})
            console.log(res)
            if (res.status === 204){
                setSuccess(true)
            }
            
        }catch(err){
            console.log(err)
            console.log(err.response.status)
        } 
    }

    const handleClicked = async () => {
        navigate('/')
    }

    return (
        <div className="SignIn">
        <div className="auth-form-container">
            {success ? (
                <div>
                <h2>You are a ProUser now</h2>
                <button className='link-btn' onClick={handleClicked}>Go To Free Space</button>
            </div>
            ) : (
            <div>
            <div className="logo">
                <h2 className="border">Free Space</h2>
                <h2 className="wave">Free Space</h2>
            </div>
            <h2 className='tittle'>Get ProUser</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="months"><strong style={{color: "white"}}>Number of months you want to be a ProUser</strong></label>
                <input value={numMonths} onChange={(e) => setNumMonths(e.target.value)} placeholder="..." id="numMonths" name="numMonths"/>
                <button type="submit">Get ProUser</button>
            </form>
            <button className='link-btn' onClick={handleClicked}>Go Back</button>
            </div>
            )}
        </div>
        </div>
    );
}