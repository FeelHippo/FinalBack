# Backendarum Conlectio.

Express and Mongoose API roundup.

## Getting Started

This project is hosted here: [AWS](3.23.114.112).
To install locally, clone this repo and run "npm run dev".

- The back end is here: [Back End Repo](https://github.com/FeelHippo/FinalBack).

- The front end is here: [Front End Repo](https://github.com/FeelHippo/FinalFront).

See dedicated repo for instructions.

## Built With

* [ExpressJS](https://expressjs.com) - Fast, unopinionated, minimalist web framework for Node.js.
* [Mongoose](https://mongoosejs.com) - Elegant mongodb object modeling for node.js.
* [node.bcrypt.js](https://www.npmjs.com/package/bcrypt) - A library to help hash passwords.
* [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken) - An implementation of JSON Web Tokens.
* [Passport JWT](http://www.passportjs.org/packages/passport-jwt/) - A Passport strategy for authenticating with a JSON Web Token.
* [SocketIO](https://socket.io) - To make chats come true.
* [NodeMailer](https://nodemailer.com/about/) - Allows easy as cake email sending.

## Notes

The routing is taken care of by two separate controllers, one for user authentication, the other for item handling. 

File upload: a utility module is in charge of setting up Multer, so as to store static images on the server. A reference to the file will be stored on Mongo as part of the advertisement. The reference will then be used by the front end to retrieve the static file. 

Chat: a utility module is in charge of setting up SocketIO, which emits three different responses depending on whether it receives a message, typing or not typing event.






