import './Comment.css'

export const Comment = (props) => {

    const username = props.username
    const profileURL = props.profileURL
    const text = props.text


    return (

        <div className="Post-user">
        <div className="Post-user-profilepicture">

                <img src={profileURL}/>

            </div>
        <div className="descrip">

            
            <strong>{username} </strong> {text}
            
           
            </div>
        </div>
    );
}