# Academical-reborn backend

This is the frontend for the "Academical-reborn" web app.

## Description

The frontend was built using React as the main library, with the new hooks library, and Redux for the state management of the app.

## Libs

- react: Frontend library of the project
- react-dom: Dependency needed by react
- react-scripts: Dependency needed by react
- redux: State management solution for this project
- react-redux: Dependency needed to use redux in react
- react-router-dom: Router solution used for this project
- react-flatpickr: Library used to let people choose a date and time in a material-style like callendar
- axios: Package used to handle http requests
- node-sass: Sass compiler used to compile .scss files

## Setup: Environmental variables

There are two files por environment variables in this project: .env and .env.development. Both are ignore in the repo and are only configured locally. The first file refers to variables used in production and the second one, to those used in development.

Currently the variables found in each file are:

- REACT_APP_URL: Base url for communicating with the backend. It only takes into account the host, protocol and port,e.g., http://localhost:4000

## Setup: Run the app

Open a terminal or cmd in this folder and run:

```
npm install
```

When libs are installed, run the next command for making the frontend run in development mode:

```
npm start
```

The app should be running at port 3000, this is made for developing. Once the app is ready for production run:

```
npm run build
```

This will generate a dist folder with the production ready version of the frontend. The contents of this folders must be copied into the public folder found in the root folder of the backend folder and later run the backend in production mode

## Folder structure

- src: Contains the code developed for the application
  - app: Contains the app component. This is the main component of the app
  - assets: Contains main assets of the project: icons, images, etc.
  - components: Contains all app components besides app itself
  - css: Contains global sass file for the page
  - pages: Components which store the main file template setup of each page. Currently: login, schedule and tutorial.
  - store: Folder to configure everything about the store: reducers, actions, state, etc. Currently auth, events, schedules and current week are managed in the store
  - util: common JS functions used throughout the app are stored here. It includes auth and localStorage related functions, week related functions, hash from string to number for types of events function and constants for the grid
  - index.js: Main file needed for react to build the SPA
- public: Where the production ready app is located in order to be copied to the backend
