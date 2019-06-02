import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
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
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: '',
      user: null
    }
  }

  setActiveRoom = (room) => {
    this.setState({ activeRoom: room });
  }

  setActiveUser = (user) => {
    this.setState({ user: user })
  }

  render() {
    return (
      <section className="App">
        <div className='container'>
          <div className='row'>
            <div className='col-3'>
              <h1 className='chat-room-title'>
                Bloc Chat
              </h1>
              <div>
                <User firebase={firebase} activeUser={this.setActiveUser} user={this.state.user} />
              </div>
              <h2 className='rooms-title'>Rooms</h2>
              <RoomList firebase={firebase} activateRoom={this.setActiveRoom} />
            </div>
            <div className='col-9'>
              <div>
                <h2 className='active-rooms'>{this.state.activeRoom.name}</h2>
              </div>
              {this.state.activeRoom ?
                (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key} />)
                : (<h3>Click on a room to get started!</h3>)}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
