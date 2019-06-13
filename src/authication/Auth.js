import auth0 from "auth0-js";

export default class Audth {
  auth0 = new auth0.WebAuth({
    domain: 'dev-boogie-woogie.auth0.com',
    clientID: 'Pr3GPwMGwsocCaKKlHn6RR46YGsgWNlJ',
    redirectUri: 'http://localhost:3000/',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}