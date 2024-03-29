import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { M_USERS } from "../api/UsersHost";
import { useLocalStorage } from "../components/Login";
import { M_CONTENT } from "../api/ContentHost";

export const ProUser = () => {

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

    const navigate = useNavigate()

    const [numMonths, setNumMonths] = useState(3)
    const [success,setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(parseInt(numMonths) > 0){
            try{ 
                const res = await axios.put(M_CONTENT + "api/users/pro", {"numMonths": parseInt(numMonths)})
                console.log(res)
                if (res.status === 204){
                    setSuccess(true)
                    setError(false)
                }
                
            }catch(err){
                console.log(err)
                console.log(err.response.status)
            } 
        }else{
            setError(true)
            setSuccess(false)
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
                <input type="number" min={1} value={numMonths} onChange={(e) => setNumMonths(e.target.value)} placeholder="..." id="numMonths" name="numMonths"/>
                <button type="submit">Get ProUser</button>
                {error && (
                <h5 className='error'>Number of months can not be 0 or less</h5>
                )}
            </form>
            <button className='link-btn' onClick={handleClicked}>Go Back</button>
            </div>
            )}
        </div>
        </div>
    );
}