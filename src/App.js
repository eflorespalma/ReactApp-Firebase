import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }


  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        console.log(`${result.user.email} is online`);
      })
      .catch((error) => {
        console.log(`Error ${error.code}: ${error.message}`);
      });
  }

  handleLogOut() {
    firebase.auth().signOut()
      .then((result) => {
        console.log(`${result.user.email} is offline`);
      })
      .catch((error) => {
        console.log(`Error ${error.code}: ${error.message}`);
      });
  }

  renderLoginButton() {
    if (this.state.user) {
      return (
        <div>
          <img src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <p>Hola {this.state.user.displayName}</p>
          <button onClick={this.handleLogOut}>Log Out</button>
        </div>
      );
    }else{
      return (<button onClick={this.handleAuth}>Login with Google</button>)
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Minigram</h2>
        </div>
        <p className="App-intro">
          {this.renderLoginButton()}
        </p>
      </div>
    );
  }
}

export default App;