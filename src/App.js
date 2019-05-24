import React, { Component } from 'react';
import RoomList from './components/RoomList';
import './App.css';
import * as firebase from 'firebase';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDJBuehmxaXQCy1fn1i6k_0EvKaK_mUbV0",
    authDomain: "bloc-chat-react-94c82.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-94c82.firebaseio.com",
    projectId: "bloc-chat-react-94c82",
    storageBucket: "bloc-chat-react-94c82.appspot.com",
    messagingSenderId: "982424736019",
    appId: "1:982424736019:web:8fac7257153a054a"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return (
      <section className="App">
        <RoomList firebase={firebase} />
      </section>
    );
  }
}

export default App;
