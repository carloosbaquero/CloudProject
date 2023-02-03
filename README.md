# CloudProject: FreeSpace
## What is it?
FreeSpace is a cloud native web application intended to be used on computers. Specifically, it is a social network for sharing images and videos among all its users. 

Where the main objective is to create a healthy social network without all the toxicity and deception that accompanies most of the social networks used today. 

> TODO: EXPLICATION ABOUT THE OBJECTS OF THE SOCIAL NETWORK AND MORE INFORMATION ABOUT IT, MAYBE PICTURES OF THE USER INTERFACE AND THE LOGO OF THE APPLICATION

---
## Sections
- [Installation from Source Code](#installation-from-source-code)
- [Microservices](#microservices)
- [API](#api)
- [Cloud Architecture](#cloud-architecture)
- [Problems](#problems)
- [Costs](#costs)

---

## Installation from Source Code
### Dependencies:
- **NodeJs**. See the official installation guide [here](https://nodejs.org/en/download/).
- **MariaDB**. Relation database used in the development of this project (another relational database can be chosen if it is supported by the ORM Sequelize). 
Official installation guide [here](https://mariadb.org/download)
- **Optional** *Docker* (if you want to use the custom docker images that are implemented). Official installation guide [here](https://www.docker.com/products/docker-desktop/)

The first step in the installation on the localhost from the application source code, is the configuration of the environment that the application would use. 

> All the different variables that FreeSpace need are defined in the file _.env.example_ of each microservice. 

Then we have to do the installation of all the dependencies of each respective microservice, which are defined in their respective package.json files. Where we used the node packager manager npm.


``` bash 
npm install
```

[Back to the top](#cloudproject-freespace)

---

## Microservices

FreeSpace is composed of three different microservice that are in charge of the management of the web application. Where two of them form the backend and the last one is in charge of exposing the frontend to all users. 

The content of the social network images, videos and comments are managed by one single microservice. 

All the information of the users are controlled by the other microservice that make up the application.

> TODO: INTRODUCTION MICROSERVICE FRONTEND

### Content Microservice

### User Microservice
### User Interface Microservice
> TODO: EXPLANATION ABOUT USER INTERFACE MICROSERVICE 


[Back to the top](#cloudproject-freespace)

---

## API

FreeSpace has an api with which you can interact with all the elements of the application. 

**API Objects:**

- Post  

  ``` json
  {
    "id": "Unique identifier of post",
    "contentType": "Differentiate if the post is an image or a video",
    "name": "Unique name of post",
    "userId": "Identifier of the post's owner",
    "description": "Description of the post",
    "publicURL": "URL to access the image or video"
  }
  ```

- Comment

  ``` json
  {
    "id": "Unique identifier of comment",
    "text": "Commentary content",
    "userId": "Identifier of the comment's owner",
    "contentId": "Identifier of the post that is related to the comment"
  }
  ```


- User  

  ``` json
  {
    "id": "Unique identifier of user",
    "name": "Unique name of user",
    "email": "Unique email of user",
    "proUser": "Differentiate if the user is regular or pro",
    "proDate": "Date when the user became pro",
    "numMonthsPro": "Number of Months user has paid to be pro",
    "profilePicture": "Name of profile picture image",
    "publicURL": "URL to access profile picture"
  }
  ```

- PostWithUser
  ``` json
  {
    "id": "Unique identifier of post",
    "userId": "Unique identifier of user",
    "name": "Unique name of post",
    "description": "Description of post",
    "contentType": "Differentiate if the post is an image or a video",
    "email": "Unique email of user",
    "userName": "Unique name of user",
    "proUser": "Differentiate if the user is regular or pro",
    "proDate": "Date when the user became pro",
    "numMonthsPro": "Number of Months user has paid to be pro",
    "profilePicture": "Name of profile picture image",
    "publicURL": "URL to access post image or video",
    "profilePublicURL": "URL to access profile picture"
  }
  ```

- CreatePost

  ``` json
  {
    "name": "Post name",
    "description": "Post description"
  }
   ```

- CreateComment
  ``` json
  {
    "text": "Comment text",
    "contentId": "Post id"
  }
  ```

- CreateUser
  ``` json
  {
    "name": "User name",
    "password": "User password",
    "email": "User email"
  }
  ```

- UpdateUser
  ``` json
  {
    "email": "User email"
  }
  ```


- UpdateComment
  ``` json
  {
    "text": "Comment text"
  }
  ```

- UpdatePost
  ``` json
  {
    "description": "Post description"
  }
   ```

- LogIn
  ``` json
  {
    "name": "User name",
    "password": "User password"
  }
   ```

- Token
  ``` json
  {
    "accessToken": "User accessToken",
    "refreshToken": "User refreshToken",
    "name": "User name"
  }
   ```

- TokenResponse
  ``` json
  {
    "expired": "True or false depending on whether the token has expired",
    "token": "New token if it has expired or null",
    "name": "User name"
  }
   ```

- ProUser
  ``` json
  {
    "numMonths": "Number Months user will be pro"
  }
   ```


**URL FreeSpace API:**

- **POSTS**

  | URL                      | METHOD | HEADERS | BODY | RESPONSE                         |
  |--------------------------|--------|---------|------|----------------------------------|
  | /api/contents            | GET    | None    | None | Array\<Post>                      |
  | /api/contents/users      | GET    | None    | None | Array\<PostWithUser>        |
  | /api/contents/:id        | GET    | None    | None | Post                             |
  | /api/images             | GET    | None    | None | Post -> Image                    |
  | /api/images/user/:userId | GET    | None    | None | Array\<Post -> Image> own by User |
  | /api/images/file/:id     | GET    | None    | None | PublicURL Post -> Image          |
  | /api/videos             | GET    | None    | None | Post -> Video                    |
  | /api/videos/user/:userId | GET    | None    | None | Array<Post -> Video> own by User |
  | /api/images     | POST    | Bearer Token    | CreatePost | 201 |
  | /api/images/file     | POST    | Bearer Token    | FormData | 201 |
  | /api/videos     | POST    | Bearer Token    | CreatePost | 201 |
  | /api/videos/file     | POST    | Bearer Token    | FormData | 201 |
  | /api/images/:id     | PUT    | Bearer Token    | UpdatePost | 204 |
  | /api/videos/:id     | PUT    | Bearer Token    | UpdatePost | 204 |
  | /api/images     | DELETE    | Bearer Token    | None | 204 |
  | /api/images/file/:id     | DELETE    | Bearer Token    | None | 204 |
  | /api/videos    | DELETE    | Bearer Token    | None | 204 |
  | /api/videos/file/:id    | DELETE    | Bearer Token    | None | 204 |

- **COMMENTS**

  | URL                      | METHOD | HEADERS | BODY | RESPONSE                         |
  |--------------------------|--------|---------|------|----------------------------------|
  | /api/comments            | GET    | None    | None | Array\<Comment>                      |
  | /api/comments/:id      | GET    | None    | None | Comment        |
  | /api/comments/content/:postId        | GET    | None    | None | Array\<Comment> own by Post                             |
  | /api/comments     | POST    | Bearer Token    | CreateComment | 201 |
  | /api/comments/:id     | PUT    | Bearer Token    | UpdatePost | 204 |
  | /api/comments/:id     | DELETE    | Bearer Token    | None | 204 |

- **USERS** 
  | URL                      | METHOD | HEADERS | BODY | RESPONSE                         |
  |--------------------------|--------|---------|------|----------------------------------|
  | /api/users          | GET    | Bearer Token    | None | User                      |
  | /api/users/:id      | GET    | None    | None | User        |
  | /api/users/all        | GET    | None    | None | Array\<User>                             |
  | /api/users     | POST    | None  | CreateUser | 201 |
  | /api/users/profile     | POST    | Bearer Token    | FormData | 201 |
  | /api/users/login     | POST    | None    | LogIn | Token |
  | /api/users/token     | POST    | None    | Token | TokenResponse |
  | /api/users     | PUT    | Bearer Token    | UpdateUser | 204 |
  | /api/users/profile     | PUT    | Bearer Token    | FormData | 204 |
  | /api/users/pro     | PUT    | Bearer Token    | ProUser | 204 |
  | /api/users/check     | PUT    | Bearer Token    | None | "User is pro" or "User is no longer pro"|
  | /api/users     | DELETE    | Bearer Token    | None | 204 |
  | /api/users/profile     | DELETE    | Bearer Token    | None | 204 |
  | /api/users/logout    | DELETE    | Bearer Token    | None | 204 |

[Back to the top](#cloudproject-freespace)

---

## Cloud Architecture
[Back to the top](#cloudproject-freespace)

---

## Problems
[Back to the top](#cloudproject-freespace)

---

## Costs
[Back to the top](#cloudproject-freespace)
