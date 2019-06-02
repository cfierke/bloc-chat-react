import React, { Component } from 'react';
//import faker from 'faker';

//const fakerChange = faker.image.avatar();

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username: '',
      content: '',
      roomId: '',
      sentAt: '',
    }

    this.messageRef = this.props.firebase.database().ref( 'messages' );
  }

  componentDidMount() {
    this.messageRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({
        messages: this.state.messages.concat( message )
      });
    });
  }

  handleMessageChange = (e) => {
    e.preventDefault();
    this.setState({
      username: 'userTemp',
      content: e.target.value,
      roomId: this.props.activeRoom,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });
  }

  createMess = (e) => {
    e.preventDefault();
    this.messageRef.push({
      username: this.state.username,
      content: this.state.content,
      roomId: this.state.roomId,
      sentAt: this.state.sentAt
  });
    this.setState({ content: '' })
  }

  render() {

    const listMess = (
      this.state.messages.map((message) => {
        if (message.roomId === this.props.activeRoom) {
          return <ul
                  key={message.key}
                  className='list-inline'
                >
                  <li>
                    User: { message.username }
                  </li>
                  <li>
                    Message: { message.content }
                  </li>
                  <li>
                    Created: { message.sentAt }
                  </li>
                </ul>
        }
        return null;
      })
    );

    return (
      <section>
        {/*}<span className='avatar'>
          <img src={fakerChange} alt='logo'/>
        </span>{*/}
        <section className='Messages'>
        <h3>Messages</h3>
          {listMess}
        </section>
        <form
          className='new-Message'
          onSubmit={this.createMess}
        >
          <input
            className='form-control'
            type='text'
            placeholder='Post!'
            value={this.state.content}
            onChange={this.handleMessageChange}
          />
          <input
            className='btn btn-success'
            type='submit'
            value='Add Message'
          />
        </form>
      </section>
    )
  }
}

export default MessageList;
