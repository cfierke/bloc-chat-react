import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import './App.css';
import * as firebase from 'firebase';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBx5IYGgulwB0UmHhR-u2IgMErlZQnWK6k",
    authDomain: "bloc-chat-react-fbbf6.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-fbbf6.firebaseio.com",
    projectId: "bloc-chat-react-fbbf6",
    storageBucket: "bloc-chat-react-fbbf6.appspot.com",
    messagingSenderId: "984833829249",
    appId: "1:984833829249:web:c7a7aea4466d9954"
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

    const activeUserName = this.state.user ? this.state.user.displayName : 'Guest';

    return (
      <section className="App">
        <div className='container'>
          <div className='row'>
            <div className='col-3'>
              <h1 className='chat-room-title'>
                Bloc Chat
              </h1>
              <div>
                <User
                  firebase={ firebase }
                  activeUser={ this.setActiveUser }
                  user={ this.state.user }
                />
              </div>
              <h2 className='rooms-title'>Rooms</h2>
              <RoomList
                firebase={ firebase }
                activateRoom={ this.setActiveRoom }
              />
            </div>
            <div className='col-9'>
              <div>
                <h2 className='active-rooms'>{ this.state.activeRoom.name }</h2>
              </div>
              { this.state.activeRoom ?
                (<MessageList
                  firebase={firebase}
                  activeRoom={ this.state.activeRoom.key }
                  user={ activeUserName } />)
                : (<h3>Click on a room to get started!</h3>) }
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
