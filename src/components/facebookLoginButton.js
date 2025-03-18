import React, { Component } from 'react';

export default class FacebookLogin extends Component {

  state = {
    username: null
  };
  componentDidMount() {
    document.addEventListener('FBObjectReady', this.initializeFacebookLogin);
  }

  componentWillUnmount() {
    document.removeEventListener('FBObjectReady', this.initializeFacebookLogin);
  }

  /**
   * Init FB object and check Facebook Login status
   */
  initializeFacebookLogin = () => {
    console.log("Facebook login called");
    this.FB = window.FB;
    this.checkLoginStatus();
  }
/**
   * Check login status
   */
checkLoginStatus = () => {
  this.FB.getLoginStatus(this.facebookLoginHandler);
}

/**
 * Check login status and call login api is user is not logged in
 */
facebookLogin = () => {
  console.log("is facebook ",this.FB);
  if (!this.FB) return;

  this.FB.getLoginStatus(response => {
    if (response.status === 'connected') {
      this.facebookLoginHandler(response);
    } else {
      this.FB.login(this.facebookLoginHandler, {scope: 'public_profile'});
    }
  }, );
}


facebookLoginHandler(response) {
  console.log("statuses ", response.status);
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      console.log('Welcome! Fetching your information.... ');
      this.FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        //document.getElementById('status').innerHTML =
         // 'Thanks for logging in, ' + response.name + '!';
      });
    } else {
      console.log("couldnt log in ", response.status);
      // The person is not logged into your app or Facebook.
     // document.getElementById('status').innerHTML = 'Please log into this app.';
    }
  }

  



  render() {
    //return (
      let {children} = this.props;
      console.log("children ",children);
      return (
        <div onClick={this.facebookLogin}>
          {children}
        </div>
      );
  
  //)
  }
}