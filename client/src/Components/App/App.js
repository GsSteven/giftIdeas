import React from 'react';
import './App.css';
import axios from 'axios';
import Friend from '../Friend/Friend';
import AddFriend from '../AddFriend/AddFriend';

//img imports
import addPerson from './../../images/add.png';
import searchIcon from './../../images/findFriendIcon.png';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      queryFriends: [],
      openAdd: false,
      query: ''
    }
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getFriends = this.getFriends.bind(this);
    this.openAdd = this.openAdd.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  search() {
    //if query is in name return array
    const queryArray = this.state.friends.filter(friend => {
      return friend.name.toLowerCase().indexOf(this.state.query) !== -1
    });

    this.setState({ queryFriends: queryArray });
  }

  handleChange(e) {
    const value = e.target.value.toLowerCase();
    //if search bar is empty clear queryFriends so full friend list is displayed again
    if (!value) {
      this.setState({ queryFriends: [] });
    }
    this.setState({ query: value });
  }

  handleKeyPress(e) {
    const charCode = e.charCode;
    if (charCode === 13) {
      this.search();
    }
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
    if (this.state.queryFriends[0]) {
      friends = this.state.queryFriends.map(friend => {
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
      })
    }
    else if (this.state.friends[0]) {
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
          <u>Gift Ideas</u>
        </header>
        <section className="friendList">
          <img className="addFriend" src={addPerson} alt="add a friend" title="Add a friend" onClick={this.openAdd} />
          <div className="searchBox" onKeyPress={this.handleKeyPress}>
            <img id="searchIcon" src={searchIcon} alt="findFriend" />
            <input type="text" id="findByName" name="findByName" placeholder="Find by Name" onChange={this.handleChange} />
          </div>
          {this.state.openAdd &&
            <AddFriend close={this.openAdd} refresh={this.refresh} />
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
