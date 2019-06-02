import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
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
    this.state = { activeRoom: '' }
  }

  setActiveRoom = (room) => {
    this.setState({ activeRoom: room });
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
              <h2 className='rooms-title'>Rooms</h2>
              <RoomList firebase={firebase} activateRoom={this.setActiveRoom} />
            </div>
            <div className='col-9'>
              <section>
                <h1>Click on a room to get started!</h1>
                <h2>{this.state.activeRoom.name}</h2>
              </section>
              {this.state.activeRoom ? (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key} />) : null}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
