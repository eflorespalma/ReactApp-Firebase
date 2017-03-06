import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import App from './App';
import './index.css';

firebase.initializeApp({
  apiKey: "AIzaSyAV3nNiyIaGGwQtaYWrSuy6cVUadZk0jiQ",
  authDomain: "minigram-4d1ef.firebaseapp.com",
  databaseURL: "https://minigram-4d1ef.firebaseio.com",
  storageBucket: "minigram-4d1ef.appspot.com",
  messagingSenderId: "76728838586"
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
