import React from 'react';
import './App.css';
import axios from 'axios';
import Friend from '../Friend/Friend';

//img imports
import addPerson from './../../images/add.png';
import AddFriend from '../AddFriend/AddFriend';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      openAdd: false
    }
    this.getFriends = this.getFriends.bind(this);
    this.openAdd = this.openAdd.bind(this);
  }

  getFriends() {
    axios.get('/api/friends')
      .then(response => {
        this.setState({ friends: response.data });
      },
        error => {
          console.log(error);
        });
  }

  openAdd() {
    this.state.openAdd ? this.setState({ openAdd: false }) : this.setState({ openAdd: true });
  }

  refresh() {
    this.getFriends();
  }

  componentDidMount() {
    this.getFriends();
  }

  render() {
    let friends;
    if (this.state.friends[0]) {
      friends = this.state.friends.map(friend => {
        return <Friend
          name={friend.name}
          birthday={friend.birthday}
          favoriteColor={friend.favoriteColor}
          favoriteCandy={friend.favoriteCandy}
          gifts={friend.gifts}
          id={friend._id}
          refresh={this.refresh}
          key={friend.name + friend.birthday + friend.favoriteColor}
        />
      });
    }

    return (
      <div className="appWrapper">
        <header>
          Gift Ideas
        </header>
        <section className="friendList">
          <img className="addFriend" src={addPerson} alt="add a friend" title="Add a friend" onClick={this.openAdd} />
          {this.state.openAdd &&
            <AddFriend close={this.openAdd} />
          }
          <div className="friends">
            {friends}
          </div>
        </section>
      </div>
    );
  }
};

export default App;
