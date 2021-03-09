import React from 'react';
import './App.css';
import axios from 'axios';
import Friend from '../Friend/Friend';

//img imports
import addPerson from './../../images/add.png';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      openAdd: false
    }
  }

  getFriends() {
    axios.get('/api/friends')
      .then(response => {
        console.log(response);
      });
  }

  render() {
    return (
      <div className="appWrapper">
        <header>
          Gift Ideas
        </header>
        <section className="friendList">
          <img className="addFriend" src={addPerson} alt="add a friend" title="Add a friend" />
          {this.state.openAdd &&
            <div className="addFriendInput">

            </div>
          }
          <Friend name="jake from state farm" />
        </section>
      </div>
    );
  }
};

export default App;
