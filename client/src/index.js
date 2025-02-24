import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './redux/store'; // Import the store
import { GoogleOAuthProvider } from '@react-oauth/google';
// const clientId = '927827598701-nvnb0asvr2ii5tptgpurprb5c7pfpnd7.apps.googleusercontent.com'; // Replace with your Google client ID
const clientId = process.env.REACT_APP_GOOGLE_LOGIN; // Replace with your Google client ID


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
  <Provider store={store}>
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>
      {/* <App /> */}
    </Provider>
  </React.StrictMode>
);





// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

