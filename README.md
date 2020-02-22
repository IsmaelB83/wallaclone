# WALLACLONE

Wallaclone in my final project for the Keepcoding Fullstack Development Bootcamp (VII edition). This repository contains a fully functional
application to manage buy/sell products in an application similar to Wallapop (ebay kind of web). Some of the main features of this project are:

- Full stack application in MERN Stack
- Advanced use of REDUX (thunks, multiple reducers, async action creators, extra middlewares and connected router with redux)
- Responsive application using layouts written in grid, flexbox and using the material-ui library
- Push notifications and email management used to notify the user regarding his favorite products.
- Real time chat integrated using socket.io. This provides the users the possibility to discuss in real time and make a deal.
- Frontend and API are integrated using JWT authentication. 
- In the backend there are four main services: the API-Rest, the thumbnails generators, the chat server and the notify server. All of them are connected with the frontend to provide all its functionality.
- There are two uses of rabbitmq queues in order to decouple the different microservices of the backend.
- In order to integrate the service in charge of notifications and the frotend there is a service-worker implemented on top react.
- The database is mongodb. Using to interact with it mongoose package.

## CONTENTS
- [DEPENDENCIES](#DEPENDENCIES)
- [OPERATIONS MANUAL](#OPERATIONS-MANUAL)
  - [Download](#Download)
  - [Install dependencies](#Install-dependencies)
  - [Initialize the data base](#Initialize-the-data-base)
  - [Configuration](#Configuration)
  - [Start application](#Start-application)
- [WEB](#WEB)
  
## DEPENDENCIES

This application makes use of the following packages

### React, Router and redux
- "axios": "^0.19.0"
- "connected-react-router": "^6.7.0"
- "react": "^16.10.2"
- "react-dom": "^16.10.2"
- "react-i18next": "^9.0.10"
- "react-moment": "^0.9.6"
- "react-redux": "^7.1.3"
- "react-router-dom": "^5.1.2"
- "react-scripts": "3.2.0"
- "react-scrollable-feed": "^1.1.2"
- "react-share": "^4.0.1"
- "redux": "^4.0.4"
- "redux-logger": "^3.0.6"
- "redux-thunk": "^2.3.0"
- "prop-types": "^15.7.2"

### Basic functionality of API Rest backend:
- "body-parser": "^1.19.0"
- "express": "^4.17.1"
- "express-validator": "^6.1.1"
- "moment": "^2.24.0"
- "mongoose": "^5.7.5"
- "mongoose-url-slugs": "^1.0.2"
- "morgan": "^1.9.1"
- "cors": "^2.8.5"
- "dotenv": "^8.2.0"

### Microservices integration
- "amqplib": "^0.5.5"

### Manage images
- "multer": "^1.4.2"
- "jimp": "^0.8.5"

### Authentication
- "is-valid-username": "0.0.1"
- "jsonwebtoken": "^8.5.1"
- "bcrypt-nodejs": "0.0.3"

### Real time chat and push notifications
- "socket.io": "^2.3.0"
- "socket.io-client": "^2.3.0" (frontend)
- "web-push": "^3.4.3"

### Mail functionality
- "juice": "^5.2.0"
- "ejs": "^2.6.2"
- "ejs-promise": "^0.3.3"
- "html-to-text": "^5.1.1"
- "nodemailer": "^6.3.1"

### Internacionalization
- "i18n": "^0.8.4"
- "i18next": "^19.1.0" (frontend)
- "i18next-browser-languagedetector": "^4.0.1" (frontend)

### Design
- "@material-ui/core": "^4.5.1"
- "@material-ui/icons": "^4.5.1"
- "notistack": "^0.9.7"


## OPERATIONS MANUAL

### Download

To download the repository
```
\downloads\git clone https://github.com/IsmaelB83/keepcoding-wallaclone.git
```

### Install dependencies

Install all the required npm packages both in backend and frontend folders
```
\downloads\keepcoding-wallaclone\backend\npm install
\downloads\keepcoding-wallaclone\frontend\npm install
```

### Initialize the data base

This will delete all the current data in wallaclone database, and fill with with demo user/adverts and chats:
```
\downloads\keepcoding-wallaclone\npm run init
```

### Configuration

Before starting the app you need to create one .env file for each backend and frontend. These files contains essential information to be able to start the app:

***BACKEND***
- MONGODB connection: MONGODB_URL=mongodb://localhost:27017/wallaclone
- AMPQLIB configuration RABBITMQ_URL=amqp://user:pass@hostname/instance
- Secret to generate JWT tokes: SECRET=qwertyuiopasdfghjklñzxcvbnm
- Path to certificates (1): HTTPS_KEY=./certs/example.com+5-key.pem
- Path to certificates (2): HTTPS_CERT=./certs/example.com+5.pem
- API PORT: PORT=8443
- WEBSOCKET CHAT PORT: PORT_WS=8444
- PUSH NOTIFICATION PORT: PORT_WS=8445
- Transporter for nodemailer (user): SENDGRID_USER=user
- Transporter for nodemailer (pass): SENDGRID_PASS=pass
- Default api limit for pagination: MAX_API_ADVERTS=20
- Push notifications VAPID Keys (public): VAPID_KEY_PUBLIC=qweqwsafqwrqfqwfwqfqwfwfqwfqwfwfwqf
- Push notifications VAPID Keys (private): VAPID_KEY_PRIVATE=nñansdasdqweqweqwdqweweqEñanañnñanñasnñdñasnñdasd
- URLs for navigation content generated from backend (backend paths): BACKEND_URL=https://127.0.0.1:8443
- URLs for navigation content generated from backend (frontend paths): FRONTEND_URL=http://127.0.0.1:3000

***FRONTEND***
- API Endpoint: REACT_APP_API_URL=https://127.0.0.1:8443/apiv1
- Chat Endpoint: REACT_APP_CHAT_URL=https://127.0.0.1:8444/
- Push Notification Server Endpoint: REACT_APP_NOTIFY_URL=https://127.0.0.1:8445/
- ID in local storage: REACT_APP_LOCALSTORAGE_ID=wallaclone
- MAX Adverts per page: REACT_APP_MAX_ADVERTS_UI=10
- MAX Adverts requested per api call: REACT_APP_MAX_ADVERTS_API=20

### Start application

Once everything is configured this is the order to start the application:
```
\downloads\keepcoding-wallaclone\backend\npm start
\downloads\keepcoding-wallaclone\backend\npm run photos
\downloads\keepcoding-wallaclone\backend\npm run notify
\downloads\keepcoding-wallaclone\backend\npm run chat
```

Then we can start the frontend

```
\downloads\keepcoding-wallaclone\frontend\npm start
```

## WEB

Find below some screenshots from wallaclone:

### Authentication screens

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-wallaclone/master/frontend/src/assets/images/readme/image_01.jpg)

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-wallaclone/master/frontend/src/assets/images/readme/image_02.jpg)

### Lists

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-wallaclone/master/frontend/src/assets/images/readme/image_03.jpg)

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-wallaclone/master/frontend/src/assets/images/readme/image_04.jpg)

### Adverts

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-wallaclone/master/frontend/src/assets/images/readme/image_08.jpg)

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-wallaclone/master/frontend/src/assets/images/readme/image_09.jpg)

### Notifications and emails

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-wallaclone/master/frontend/src/assets/images/readme/image_06.jpg)

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-wallaclone/master/frontend/src/assets/images/readme/image_07.jpg)

### Chat

![alt text](https://raw.githubusercontent.com/IsmaelB83/keepcoding-wallaclone/master/frontend/src/assets/images/readme/image_05.jpg)