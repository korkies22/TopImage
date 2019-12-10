# TopImage

PWA App which allows people to create create constests for evaluating the best (or top) image and search for previous winners. It is aimed to be an A/B testing platform.

## Colaborators

- Carlos Mario Sarmiento: Alias "El Korkies"

  [Personal Site](https://korkies22.github.io/Portfolio/) - [GitHub](https://github.com/korkies22/)

- Sergio Guzmán Mayorga: Alias "El Checho"

  [Personal Site](https://sguzmanm.github.io/i-am-sergio-guzman/) - [GitHub](https://github.com/sguzmanm)

## Links

**Deployed at:** https://top-image.herokuapp.com/

## Description

With TopImage, people from anywhere can post contests between a set of images they have, or a random collection retrieved using Unsplash API, in order to know what is the best/top image found here and perform A/B testing. The person must register in the system. Later, that user can create contests and vote in each of them.

For the contest creatio we are using two public APIs: [Cloudinary](https://cloudinary.com/documentation) and [Unsplash](https://unsplash.com/documentation). Cloudinary is a web platform for storing images in many ways, and as such, we are using cloudinary to save the images uploaded by the user and obtain an unique URL to retrieve the data in the UI later on. On the other hand, unsplash is a public API for retrieving images from their community of people that upload pictures of their daily lives and catalogue them. As such, we can offer an user pictures of specific topics using this API if he/she does not have pictures to upload.

The contests are composed by a name, topic, set of images and an end date. And each contest has like and dislikes buttons to express how much you like the images found here. Contests now, can also be public or private. In this case they will have an access key which they need to share. 

Top image is also now a PWA. So it is heavily responsive and can be installed in many devices. It also can show cached contests while being offline.

## Objective

We want to allow persons to create A/B Testing contests and vote for the best Top image!

## Tecnologies used

This project was developed using the MERN stack.

- **Mongo DB**: MongoDB was used as a NOSQL database. Here users,schedules and events are stored.
- **Express**: A fast, minimalistic and flexible framework for Node.js, it allows route handling in an easy way. https://expressjs.com/es/
- **React JS**: A Front End library useful for creating components. https://reactjs.org/
- **Node JS**: A javascript environment which allows to create a web server with javascript. https://nodejs.org
- **Workbox**: A google utils package to create fast Service Workers. https://developers.google.com/web/tools/workbox

Some extra dependencies were included in the project. Each can be seen in the backend or frontend folders or in the package.json files in the respective folders.

The application is deployed in https://heroku.com/

## Instructions to execute

### Requisites

- **Node JS**
- **Heroku CLI (Optional, for replicating our deployment only)**

Verify that nodejs is installed by running "node -v" on terminal or cmd. It can be downloaded in https://nodejs.org/ (versión LTS)

### Steps to run development version

Since we have both backend and frontend in the same project, the recommended course of action is:

#### Run backend

```
npm install
npm run dev
```

With both of these commands, you are installing all the necessary dependencies and then running using nodemon for hotreload if you need to change stuff in the project.

#### Run frontend

Go to the frontend folder:

```
cd frontend
```

Install dependencies and hot reload:

```
npm install
npm run dev
```

If you require further description of the frontend structure, check out the readme in the frontend folder ;)

### Steps to deploy production version into Heroku

It is assumed that the Heroku CLI is setup in your computer for this and connected to a project. If you are not sure or do not have this, please visit https://devcenter.heroku.com/articles/getting-started-with-nodejs.

1. Follow build instructions on frontend folder
2. Setup env vars in heroku of the backend .env file, by [dashboard](https://dashboard.heroku.com/) or CLI with:

```
heroku config:set <KEY>=<value>
```

## Screenshots

### Main menu

![Top Image Main Menu](./readme/ss.png)

Cuidado con la referencia a la imágen, no se puede renderizar.

## License

This project is public under the MIT license, found [here](https://github.com/korkies22/TopImage/blob/master/LICENSE)

### Libs

- cors: Enable cors for all requests
- dotenv: Use of environmental variables in .env files
- express: Node web framework used for building the REST services.
- express-validator: Validator of body request structures for Express.
- jsonwebtoken: Generation of our own authentication tokens (jwt).
- mongodb: Driver for connecting with our Mongo database in Atlas.
- morgan: Beautiful logging of REST actions.
- multer: For form data requests.
- nodemon: Hot-reloading of the backend server.
- react-flatpickr: Callendar used to selecting dates and date ranges
- socket-io: Creation of web sockets.
- socket-io-client: Client of socket io connections on frontend.

### Folder Structure

- app: All app logic related components with a general routes file and a folder for each parent resource identified on the database. For each for these resources you have either more subresources with their respective routes.js file, or the following files:
  - controller: Receives all REST requests and delegates the results to querys.js.
  - querys: Communication with the MongoDB.
  - routes: RWST routes for communicating with the backend.
- readme: Images and other attachments used in this readme
- util: Common features for the app, including auth, db, errors management and APIs connection.
- app.js: Main app connection

## Setup: Environmental variables

We are using environment variables in node throught a .env file. They are listed below:

### Token generation

- privateKey: Generated from http://travistidwell.com/blog/2013/09/06/an-online-rsa-public-and-private-key-generator/
- publicKey: Generated from http://travistidwell.com/blog/2013/09/06/an-online-rsa-public-and-private-key-generator/

Both of privateKey and publicKey are necessary to generate our own jwt tokens for sign up and log in operations.

### DB Connection

- dbUser: User for db connection
- dbPassword: Password for db connection
- dbHost: Host for db connection. Mongo atlas is recommeded for this step.

All these credentials are though out for a connection with a mongodb with SRV

### Unsplash API connection

- unsplashKey: Unsplash API key given to you by Unsplash after creating an account

### Cloudinary API connection

- cloudinaryCloudName: Cloud name of your cloudinary bucket
- cloudinaryAPIKey: API Key of your cloudianry account
- cloudinaryAPISecret: API Secret of your CLoudinary account

## Setup: Run the app

Once the .env file is properly setup with the above properties. Open a terminal on this the same folder and run:

```
npm install
```

When libs are installed, run the next command for making the server run in port 4000:

```
npm start
```

If you wish to run in development mode ("hot reload" with nodemon) type:

```
npm run dev
```

In order to build the Service Worker based on the sw-template 

```
npm run build-sw
```

## Data Model

Two main data models: Users and Contests

```
Users: {
    "_id":Mongo default,
    "username":String,
    "password":String,
    "contests":Contest[]
}
```

```
Contests: {
    "_id":Mongo default,
    "name":String,
    "topic":String,
    "username":String,
    "endDate":Date,
    "images":Image[],
    "private": 0 if false, 1 if true
}
```

When making a request, the expected image format has "data" in it ;)

```
Images:{
    "_id":Mongo default,
    "url":String,
    "likedBy":Array of Usernames,
    "likes":Number
}
```
