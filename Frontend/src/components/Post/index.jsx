import React, { Component } from "react";
import "./Post.css";

const IsImage = (image) => {
    let res = false
    const array = image.toString().split('.')
    const extension = array[array.length -1]
    if(extension == 'jpeg' || extension == 'jpg'|| extension == 'png'){
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

    const description = this.props.description;

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

            
            {image == '' && <img alt={nickname} src="https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"/> }
            <img alt={nickname} src={image}/>
            {/* {IsImage(image) && <img alt={nickname} src={image}/>}
            {!IsImage(image) && <video alt={nickname} src={image} type="video/mp4"/>} */}

            </div>

        </div>

        <div className="Post-caption">

            <strong>{nickname} </strong> {description}

        </div>

        </article>;

    }

}

export default Post;