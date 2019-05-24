import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms:[],
      newRoomName: '',
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  createRoom(e) {
    const newRoom = this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.setState({
      newRoomName: newRoom
  })
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  render() {
    return (
      <section className='chat-room-list'>
        <h1 className='chat-room-title'>
          Awesome! Chat
        </h1>
        <h2 className='rooms-title'>
          Rooms
        </h2>
          {this.state.rooms.map( room =>
            <li key={room.key} >
              {room.name}
            </li>
          )}
          <form onSubmit={ (e) => this.createRoom(e)}>
            <input type='text' placeholder='Create new room!' value={this.state.newRoomName} onChange={ (e) => this.handleChange(e) } />
            <input type="submit" value="Add Room" />
          </form>
      </section>
    )
  }
}

export default RoomList;
