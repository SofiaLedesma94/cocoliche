import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
// Importing Sass with Bootstrap CSS
import './App.scss';
import store from './redux/reducers/rootReducer'
import firebase from 'firebase'

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyA39V7iOwT-_TJ4NwP1P0IfjKxFEhoE6q4",
  authDomain: "cocoliche-resto-bar.firebaseapp.com",
  projectId: "cocoliche-resto-bar",
  storageBucket: "cocoliche-resto-bar.appspot.com",
  messagingSenderId: "909495572810",
  appId: "1:909495572810:web:e4e004d1f31849f31049b3",
  measurementId: "G-NJNYKC3MGR"
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

