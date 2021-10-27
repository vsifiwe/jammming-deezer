# Jammming

This NodeJS application is paired with a React client hosted on [Netlify](https://silly-perlman-b4de38.netlify.app/) and the code hosted on [Github](https://github.com/vsifiwe/jammming).

## Installation

### Requirements

1.  NodeJS and NPM or Yarn

### Local Machine testing

- Clone [this](https://github.com/vsifiwe/jammming-deezer) project from GitHub to your local machine
- In the project directory, you can run: `yarn start` or `npm run start`. This command runs the app in development mode on your local machine.
- Open [http://localhost:3030](http://localhost:3030) to test it.

### Endpoints

The API has the following methods:

- GET /auth : This endpoint returns a Deezer token that allows user's to authenticate and access protected routes on Deezer's API.
- GET /search: This endpoint allows a user to search through Deezer's catalogue
- GET /user: This endpoint returns the user's ID that is used to create a playlist on the user's deezer account.
- GET /createplaylist: This endpoint accepts the user's token, playlist name and songs and creates a playlist on the user's deezer account

### Deployment

This project is deployed on Heroku on [this link](https://jammming-deezer.herokuapp.com/).
