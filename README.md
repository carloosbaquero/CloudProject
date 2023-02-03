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
