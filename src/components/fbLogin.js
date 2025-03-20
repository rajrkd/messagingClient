// FbkLogin.js
import React, { useEffect } from 'react';
import axios from 'axios';

const FbLogin = ({ onLoginSuccess }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  // Load the Facebook SDK asynchronously
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 1832746784161036, // Replace with your Facebook App ID
        cookie: true,         // Enable cookies to allow the server to access the session.
        xfbml: true,          // Parse social plugins on this webpage.
        version: 'v22.0'      // Use this Graph API version.
      });
      window.FB.AppEvents.logPageView();
    };

    // Dynamically load the SDK script
    (function (d, s, id) {
      const element = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      const js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      element.parentNode.insertBefore(js, element);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  // Function to handle login
  const handleFBLogin = () => {
    window.FB.login(response => {
      if (response.authResponse) {
        // Successful login; access token is available
        const { accessToken, userID } = response.authResponse;

        // Optionally, fetch additional user info
        window.FB.api('/me', { fields: 'name,email' }, userInfo => {
          console.log('User info:', userInfo);
          // Send the token and user information to your Express backend
          axios.post(`${apiUrl}/fblogin/auth/facebook`, { accessToken })
            .then(response => {
              // onLoginSuccess can store the JWT and user data in your app state
              console.log(response.data);
              //onLoginSuccess(response.data);
            })
            .catch(error => {
              console.error("Error verifying user token:", error);
              alert("Error verifying user!");
            });
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'email,public_profile' });
  };

  return (
    <div>
      <button onClick={handleFBLogin}>Login with Facebook</button>
    </div>
  );
};

export default FbLogin;
