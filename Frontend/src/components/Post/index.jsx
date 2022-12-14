import React, { Component } from "react";
import "./Post.css";

const IsImage = (image) => {
    let res = false
    const array = image.toString().split('.')
    const extension = array[array.length -1]
    if(extension == 'jpeg' || extension == 'jpg'){
        res = true
    }
    return res
}


class Post extends Component {



constructor(props){

    super(props);

}


render() {

    const id = this.props.id;

    const nickname = this.props.nickname;

    const profilepicture= this.props.profilepicture;

    const image = this.props.image;

    const caption = this.props.caption;

    return <article className="Post">

        <header className="head">

            <div className="Post-user">

            <div className="Post-user-profilepicture">

                {/* <img src="https://t4.ftcdn.net/jpg/02/19/63/31/360_F_219633151_BW6TD8D1EA9OqZu4JgdmeJGg4JBaiAHj.jpg" alt="John D. Veloper" /> */}
                <img src={image} alt={nickname}/>

            </div>

            <div className="Post-user-nickname">

                <span>{nickname}</span>

            </div>

            </div>

        </header>

        <div className="Post-image">

            <div className="Post-image-bg">

            

            {IsImage(image) && <img alt={nickname} src={image}/>}
            {!IsImage(image) && <video alt={nickname} src={image} type="video/mp4"/>}

            </div>

        </div>

        <div className="Post-caption">

            <strong>{nickname} </strong> Loving Educative!

        </div>

        </article>;

    }

}

export default Post;