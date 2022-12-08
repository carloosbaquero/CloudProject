import React, { Component } from "react";
import "./Post.css";

class Post extends Component {

constructor(props){

    super(props);

}

render() {

    const nickname = this.props.nickname;

    const profilepicture= this.props.profilepicture;

    const image = this.props.image;

    const caption = this.props.caption;

    return <article className="Post">

        <header>

            <div className="Post-user">

            <div className="Post-user-profilepicture">

                <img src="https://t4.ftcdn.net/jpg/02/19/63/31/360_F_219633151_BW6TD8D1EA9OqZu4JgdmeJGg4JBaiAHj.jpg" alt="John D. Veloper" />

            </div>

            <div className="Post-user-nickname">

                <span>John Doe</span>

            </div>

            </div>

        </header>

        <div className="Post-image">

            <div className="Post-image-bg">

            <img alt="Icon Living" src="https://cdn-images-1.medium.com/max/1200/1*dMSWcBZCuzyRDeMr4uE_og.png" />

            </div>

        </div>

        <div className="Post-caption">

            <strong>John D. Veloper </strong> Loving Educative!

        </div>

        </article>;

    }

}

export default Post;