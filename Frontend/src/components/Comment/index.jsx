import './Comment.css'

export const Comment = (props) => {

    const username = props.username
    const profilePicture = props.profilePicture
    const text = props.text


    return (

        <div className="Post-user">
        <div className="Post-user-profilepicture">

                <img src={'https://storage.googleapis.com/cloudapp-social_content2/images/emptyAvatar.png'} alt={profilePicture}/>

            </div>
        <div className="descrip">

            
            <strong>{username} </strong> {text}
            
           
            </div>
        </div>
    );
}