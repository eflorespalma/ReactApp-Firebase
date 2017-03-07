import React, { Component } from 'react';
import firebase from 'firebase';
import FileUpload from './FileUpload';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      uploadValue: 0,
      pictures: []
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user: user });
    });

    firebase.database().ref('pictures').on('child_added', snapshot => {
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      })
    });
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

  handleUpload(event) {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed', snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({
        uploadValue: percentage
      });

    }, error => {
      console.log(error.message)
    }, () => {
      this.setState({ uploadValue: 100 });
      const record = {
        photoURL: this.state.user.photoURL,
        displayName: this.state.user.displayName,
        image: task.snapshot.downloadURL
      };

      const dbRef = firebase.database().ref('pictures');
      const newPicture = dbRef.push();
      newPicture.set(record);
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
          <img width="100" src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <p>Hola {this.state.user.displayName}</p>
          <button onClick={this.handleLogOut}>Log Out</button>
          <FileUpload onUpload={this.handleUpload} percentage={this.state.uploadValue} />
          {
            this.state.pictures.map((picture, i) => (
              <div key={i}>
                <img width="300" src={picture.image} alt="" />
                <br />
                <img width="48" src={picture.photoURL} alt={picture.displayName} />
                <br />
                <span>{picture.displayName}</span>
              </div>
            )).reverse()
          }
        </div>
      );
    } else {
      return (<button onClick={this.handleAuth}>Login with Google</button>)
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Minigram</h2>
        </div>
        <div className="App-intro">
          {this.renderLoginButton()}
        </div>
      </div>
    );
  }
}

export default App;
