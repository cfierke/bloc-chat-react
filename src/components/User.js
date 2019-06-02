import React, { Component } from 'react';



class User extends Component {

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.activeUser(user);
});
  }

  handleLogInClick = () => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider ).then((result) => {
      console.log('success');
      const user = result.user;
      this.props.activeUser(user);
   }).catch(function(error) {
     console.log('error')
   });
  }

  handleLogOutClick = () => {
    this.props.firebase.auth().signOut().then(() => {
      console.log('success');
      this.props.activeUser(null);
      //window.alert('You have successfully logged out.');
    }).catch(function(error) {
      console.log(error)
    });
  }

  render() {
    return (
      <section>
        <form className='user-access'>
        {this.props.user ?
          (<p className='font-weight-bold'>Welcome {this.props.user.displayName}!</p>):
          (<p className='font-weight-bold'>Welcome Guest!</p>)
        }
          <input
            className='btn btn-success btn-sm btn-block'
            type='button'
            value='Log in!'
            onClick={this.handleLogInClick}
          />
          <input
            className='btn btn-success btn-sm btn-block'
            type='button'
            value='Log out!'
            onClick={this.handleLogOutClick}
          />
        </form>
      </section>
    )
  }
}

export default User
