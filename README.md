# Boogie Woogie

A Dancing Game that rates the users dansing moves by tracking it with the webcam and comparing it to the correct dance. This project was created during only three weeks as the senior project at Code Chrysalis' Immersive Programing Bootcamp.

## Demo
Try it out yourself by [visiting the deployed version](https://boogie-woogie-banana.herokuapp.com).

### Front page
PICTURE


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

The backend of this application is in a separate repo, [Boogie Woogie Backend](https://github.com/crazy-bananas/boogie-woogie-backend). Learn how to set up the backend by visiting that repo [here](https://github.com/crazy-bananas/boogie-woogie-backend).

You also need `yarn`. Please install it by using the code below, or visit [yarns official website](https://yarnpkg.com/) for more detailed instruction.

```
brew install yarn
```

### Installing

Start by forking the repository, clone it to your computer and installing all dependencies using yarn.

```
yarn
```

You also need to setup your enviromental variables as below.
```
// .env
REACT_APP_AUTH_REDIRECT_LINK=<Link to where the user should be redirected after login/logout>
REACT_APP_YOUTUBE_API_KEY=<Your Youtube API key>
REACT_APP_AUTH0_CLIENT_ID=<Your Auth0 Client ID>
REACT_APP_DEVMODE=true
```
`REACT_APP_AUTH0_CLIENT_ID` and `REACT_APP_AUTH0_CLIENT_ID` is only needed if you want to have functional login. If you leave this empty, the login button will not work.
If you imput `REACT_APP_DEVMODE`, the app will not require the player to get into start position before the song starts playing.


When aboce setup is completed, you can start the aplication by writing:

```
yarn start
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [React](https://reactjs.org/) - The web framework used

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Technologies Used

- [React](https://github.com/facebook/create-react-app)
- [Posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)
- [auth0](https://auth0.com/) - For authentication and user login
- [Axios](https://maven.apache.org/) - Dependency Management
- [Redux](https://redux.js.org/) - To handle the state
- [MongoDB](https://www.mongodb.com/) - For the database

## Authors

* **Johannes Jarbratt** - *Initial work* - [Johachi](https://github.com/johachi)
* **Johannes Jarbratt** - *Initial work* - [Johachi](https://github.com/johachi)
* **Johannes Jarbratt** - *Initial work* - [Johachi](https://github.com/johachi)
* **Johannes Jarbratt** - *Initial work* - [Johachi](https://github.com/johachi)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Code Chrysalis](https://www.codechrysalis.io/)
* [Posenet Team](https://github.com/tensorflow/tfjs-models/tree/master/posenet)
