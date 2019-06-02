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
      this.setState({
        rooms: this.state.rooms.concat( room )
      });
    });
  }

  createRoom = (e) => {
    e.preventDefault();
    const newRoom = this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.setState({
      newRoomName: newRoom
    });
    this.setState({ newRoomName: ''})

  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      newRoomName: e.target.value
    });
  }

  handleRoomClick = (key, e) => {
    e.preventDefault();
    this.props.activateRoom(key);
  }

  render() {
    return (
      <section className='chat-room-list'>
        <div>
          {this.state.rooms.map( room =>
            <div key={ room.key } className='chat-rooms'>
              <button
                className="room-name btn btn-primary btn-block button-spacing"
                onClick={(e) => this.handleRoomClick(room, e)}
              >
                { room.name }
              </button>
            </div>
          )}
        </div>
        <form id='room-form' onSubmit={this.createRoom}>
          <input
            className='form-control text-area-spacing'
            type='text'
            placeholder='Create a new room!'
            value={this.state.newRoomName}
            onChange={this.handleChange}
          />
          <input
            className='btn btn-success btn-block button-spacing'
            type="submit"
            value="Add Room"
          />
        </form>
      </section>
    )
  }
}

export default RoomList;
