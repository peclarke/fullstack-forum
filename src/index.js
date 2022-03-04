import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app';

firebase.initializeApp({
  apiKey: "AIzaSyCNfWqKJmMqcKbAWWXfDJtJlmr-sCivS7A",
  authDomain: "forum-6c192.firebaseapp.com",
  projectId: "forum-6c192",
  storageBucket: "forum-6c192.appspot.com",
  messagingSenderId: "358950380046",
  appId: "1:358950380046:web:35aa94d8710675a1da125f",
  measurementId: "G-JTE9JMXNLP"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
