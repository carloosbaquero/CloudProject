import { useState } from "react";

export const ProUser = () => {

    const [numMonths, setNumMonths] = useState(undefined)

    const handleSubmit = () => {

    }

    return (
        <div className="Post">
        <div className="auth-form-container">
            <div className="logo">
                <h2 className="border">Free Space</h2>
                <h2 className="wave">Free Space</h2>
            </div>
            <h2 className='tittle'>Get ProUser</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="months"><strong style={{color: "white"}}>Number of months you want to be a ProUser</strong></label>
                <input value={numMonths} onChange={(e) => setNumMonths(e.target.value)} placeholder="..." id="name" name="name"/>
                <button type="submit">Get ProUser</button>
            </form>
        </div>
        </div>
    );
}