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

The first step in the installation on the localhost from the application source code, is to download the source code from GitHub and the configuration of the environment that FreeSpace would use. 

``` bash
git clone https://github.com/carloosbaquero/CloudProject.git
```

> If the user does not have **git** installed on his machine he can always download the code directly from the Github repository. And all the different environmental variables that FreeSpace need are defined in the file _.env.example_ of each microservice. 


Then we have to do the installation of all the dependencies of each respective microservice, which are defined in their respective _package.json_ files. Where we used the node packager manager npm.


``` bash 
npm install
```

[Back to the top](#cloudproject-freespace)

---

## Microservices

FreeSpace is composed of three different microservice that are in charge of the management of the web application. Where two of them form the backend and the last one is in charge of exposing the frontend to all users. 

- Backend

  The content of the social network, images, videos and comments are managed by one single microservice. And all the information of the users are controlled by the other microservice that make up the application backend.

  Both microservice are an api built on the NodeJs environment with Express, using JavaScript as the programming language.

  We have decided to use NodeJs since most of the service execution time is spent on the I/O operations, waiting for database requests, making requests to other microservices or making request to google cloud services, and the complexity of the other operations is not very high.

  Thanks to the NodeJs architecture where you have a single non-blocking thread where all possible non-blocking code is executed and then different secondary threads from the thread pool take care of the necessary asynchronous requests and when they have been resolved the principal thread terminates the request to the backend and sends the response.

  We have used Express because it is a lightweight framework, fast and easy to learn and implement in the NodeJs environment. And it is already adapted to efficiently use the internal structure of NodeJs to be as efficient as possible.
  And also because it is already tested in many different web applications and is one of the most used NodeJs frameworks for web applications.

  The database connection throughout the application is managed by the ORM Sequelize. It supports many different systems to manage relational databases, such as MySQL, PostgreSQL or MariaDB. thanks to Sequelize we can greatly ensure the interaction between the backend and the database and also gain the ability to handle automatic transactions with the database to maintain data consistency.
  And we can also separate SQL code from our application, using only javascript in the backend at all times.

- Frontend:

  The FreeSpace frontend has been developed using the build tool Vite, which uses React javascript framework. Frontend microservice was built as a single page application using Express.js from Node.js.

  Frontend can make request to the different microservices in Backend using the http-based library Axios.

### Content Microservice

All files, which can be jpg, png or mp4, are controlled by this microservice. The files are saved using the google cloud service to save objects, where we have a bucket to save the post files and another one to save the user files.

Code example for uploading files to Google Storage:

``` javascript
const bucketContent = storage.bucket(BUCKET_NAME_CONTENT)
const bucketUser = storage.bucket(BUCKET_NAME_USERS)

async function uploadFileUser (file, fileName) {
  const options = {
    gzip: true
  }
  const blob = bucketUser.file(fileName)
  const blobStream = blob.createWriteStream(options)

  blobStream.on('finish', () => {
    console.log(`File ${fileName} uploaded`)
  })
  blobStream.end(file.data)
}
```
### User Microservice

The most important tasks of the user microservice is the encryption of user passwords and the saving of encrypted values in the database. For the encryption tasks we use the **bycript** library which is a NodeJs implementation of password-hashing function bycript, where we also add a salt to protect users against rainbow tables. And generate and refresh the JWT tokens that serve to authorize which resources users can access.

To summarize this microservice is in charge of authentication and authorization of users, plus all the management of their private data.

Code example of the middleware which authenticate users:
``` javascript
middlewareUser.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (typeof token === 'undefined') return res.sendStatus(401)
  jsonwebtoken.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}
```

In the authorization process of our application when the user logs into the application we check that his credentials are correct, username and password, and then we give him a token with an expiration time of 30 minutes and an indefinite token. The expiring token is the one that will authenticate the user at all times and every 30 minutes the user will have to access a specific resource with the indefinite token to refresh the expired token.
### Frontend Microservice

#### Dependencies:
- **React**. A JavaScript library for building user interfaces. Learn what React is all about on [here](https://reactjs.org)

- **Vite**. A build tool that aims to provide a faster and leaner development experience for modern web projects. Learn what Vite is all about on [here](https://vitejs.dev/guide/)

- **React-DOM**. A package that provides DOM-specific methods that can be used at the top level of your app and as an escape hatch to get outside the React model if you need to. Learn what React-DOM is all about on [here](https://reactjs.org/docs/react-dom.html)

- **Axios**. A promise-based HTTP library for Node.js that lets developers make requests to either their own or a third-party server to fetch data. Learn what Axios is all about on [here](https://axios-http.com/docs/intro)

- **React Router DOM**. A fully-featured client and server-side routing library for React. Learn what React Router DOM is all about on [here](https://reactrouter.com/en/main/start/overview)

- **Styled Components**. A React-specific CSS-in-JS styling solution that creates a platform for developers to write actual CSS code to style React components, as well as in React Native. Learn what Styled Components is all about on [here](https://styled-components.com/)

#### Production:

  For the production, Express.js, a web application framework for Node.js, was used in order to structure and route the application, using a static build created by Vite. 

  Here how it is done in the file server.js, using the build located in the directory /dist:

  ```javascript

const express = require('express')

const app = express()

app.use(express.static(__dirname + '/dist'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

app.listen(80, () => {
  console.log('estoy escuchando por el purto 80')
})
```  
  
  Learn what Express.js is all about on [here](https://expressjs.com/en/guide/routing.html)


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

- Connection of private microservices with the outside of the cluster

  When we planned the architecture of the microservices deployed in GKE, one of the objectives was to have the microservice in charge of managing user information and security as a private microservice that could not be accessed from outside the cluster.

  And due to a lack of understanding of how the framework express worked we thought that using the functionality it has implemented to redirect requests to other destinations we could use the microservice exposing the API as a kind of proxy server with the private microservice.

  But this implementation did not work well and we had to change a bit the functionality of the backend microservices, although the main objectives of keeping the security functionality and the user data management private were maintained.

  To implement this communication between the different microservices we use the npm module node-fetch to be able to use the functionalities of the Web API Fetch in the NodeJs environment and to be able to call the microservice in charge of the users.

  ``` javascript
  import fetch, { Headers } from 'node-fetch'
  import { M_USERS_HOST_DNS } from '../config.js'
  
  export function getUserAuthenticated (token) {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', token)
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }
    return fetch(`http://${M_USERS_HOST_DNS}/users`, requestOptions)
      .then(res => res.json())
  }
  ```
- Connection between the frontend and backend microservices

  In order to connect frontend and backend, we needed to know the ip of the content microservice to make requests.

  We tried to use environmnet variables from the GKE cluster to know the ip and port of the backend services, but after, we realized that the build tool Vite that we used had a special way to make the imports of the environment variables.

  When we fixed that we deployed our application in GKE and noticed that the requests to the backend were being made to an undefined ip, so we received a 404 not found error.

  Finally, we fixed this by using the same ip for the frontend and backend but different routes.

- Management of JWT tokens in the frontend

  We, for the first time, started using JWT tokens to authenticate users to let them do exclusive functions.
  
  At first, we had the problem in the frontend that after doing the login, we did not know how to store the tokens, because we needed them in all the routes of the application. 
  
  We wanted to do global variables, but after doing some research we realized that we just had to use the session storage, which is accessible from every route in the application

- Deployment of microservices on Google Kubernetes Engine

  One of the biggest problems we had when deploying the application on GKE was configuring the **Kubernetes Ingress** object to expose an entry point for all the microservices in the cluster. 
  From the first moment we tried to use the Ingress Controller provided by Google Cloud, but it always gave us a 404 Not Found response. 
  
  The first step to fix it was to adapt the Kubernetes Service objects of the microservices that were connected to the outside by the Ingress, because to use the default Google Cloud Controller the service has to be of type NodePort to work and the pathType of the Ingress Implementation has to be ImplementationSpecific. 
  
  After fixing that problem, when we tried to access the cluster from the internet only the microservice that served the frontend worked fine and the service that served the API to interact with the backend was inoperative. And in the end we found that the failure was that although all the microservices that made up the backend were working fine, there was no specific rule defined so that google cloud could _check that everything was fine_, and without that information google cloud did not let access to the last microservice that was exposed.

  We had to add this object that checks the health of the backend.
  ``` yaml
  apiVersion: cloud.google.com/v1
  kind: BackendConfig
  metadata:
    name: mcontent-backendconfig
    namespace: default
  spec:
    healthCheck:
      checkIntervalSec: 30
      port: 3001
      type: HTTP
      requestPath: /api/contents

  ```
- Terraform

[Back to the top](#cloudproject-freespace)

---

## Costs

For the deployment of this application we used the following tools that google cloud provides:

      (All the following prices are in europe-west6 Zurich)

- 1 Cluster in Google Kubernetes Engine [**$45.479/month**]:

  We used it for deploying all the three microservices and for making to of them accessibles from internet to everyone using an Ingress

- 2 Standard Storage Buckets [**$0.025 GB/month** for each]:

  One bucket is used for store the images and videos of the contents that users upload.
  The other one is used to store the profile pictures of the users

- 2 MySQL databases [**$6.64 GB/month** for each]:
 
  One used for information related to users and the other for information related to contents uploaded

**To sum up, the total price per GB/month is $58.809**

[Back to the top](#cloudproject-freespace)
