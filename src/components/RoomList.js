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
            <ul key={ room.key } className='list-inline btn btn-success'>
              <li
                className="room-name"
                onClick={(e) => this.handleRoomClick(room, e)}
              >
                { room.name }
              </li>
            </ul>
          )}
        </div>
        <form id='room-form' onSubmit={this.createRoom}>
          <input
          className='form-control'
            type='text'
            placeholder='Create a new room!'
            //value={this.state.newRoomName}
            onChange={this.handleChange}
          />
          <input
            className='btn btn-success'
            type="submit"
            value="Add Room"
          />
        </form>
      </section>
    )
  }
}

export default RoomList;
