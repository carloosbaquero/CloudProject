import { useNavigate } from "react-router-dom";

export const ErrorPage= () => {
    
    const navigate = useNavigate()

    const handleClicked = async () => {
        navigate('/')
    }

    return (
        <div className="SignIn">
        <div className="auth-form-container">
            <h2>This path does not exist</h2>
            <button className='link-btn' onClick={handleClicked}>Go To Free Space</button>
        </div>
        </div>
    );
}