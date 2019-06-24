import auth0 from "auth0-js";
import history from "../history";
import dotenv from "dotenv";
dotenv.config();

const REACT_APP_AUTH_REDIRECT_LINK =
  process.env.REACT_APP_AUTH_REDIRECT_LINK ||
  "https://boogie-woogie-banana.herokuapp.com/";
const REDIRECT_SUB =
  REACT_APP_AUTH_REDIRECT_LINK[REACT_APP_AUTH_REDIRECT_LINK.length - 1] === "/"
    ? "login"
    : "/login";
//
export default class Auth {
  accessToken;
  idToken;
  expiresAt;

  auth0 = new auth0.WebAuth({
    domain: "dev-boogie-woogie.auth0.com",
    clientID: "Pr3GPwMGwsocCaKKlHn6RR46YGsgWNlJ",
    redirectUri: REACT_APP_AUTH_REDIRECT_LINK + REDIRECT_SUB,
    responseType: "token id_token",
    scope: "openid profile email"
  });

  login() {
    this.auth0.authorize();
  }

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace("/failedlogin");
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem("isLoggedIn", "true");

    // Set the time that the Access Token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    localStorage.setItem("expireAt", expiresAt);

    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // navigate to the home route
    history.replace("/");
  }

  renewSession(check) {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
      }
    });
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.clear()

    this.auth0.logout({
      returnTo: window.location.origin
    });

    // navigate to the home route
    history.replace("/");
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = localStorage.getItem("expireAt");
    let timenow = new Date();
    if (timenow.getTime() > expiresAt) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("expireAt");
      localStorage.removeItem("user");
      localStorage.removeItem("picture");
      localStorage.removeItem("email");
    }
    return new Date().getTime() < expiresAt;
  }
}
