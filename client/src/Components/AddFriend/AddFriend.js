import React from 'react';
import './AddFriend.css';
import axios from 'axios';

//img imports
import closeButton from './../../images/xButton.png';

class AddFriend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleChange = this.handleChange.bind(this);
        this.addFriend = this.addFriend.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        const inputName = e.target.name;
        this.setState({ [inputName]: value });
    }

    addFriend(e) {
        e.preventDefault();
        const payLoad = this.state;
        axios.post('/api/friends', { data: { payLoad } })
            .then(response => {
                if (response.status === 200) {
                    this.props.close();
                    this.props.refresh();
                }
            },
                error => {

                });

    }

    render() {
        return (
            <form className="addFriendForm" onSubmit={this.addFriend}>
                <img id="closeAddFriend" src={closeButton} onClick={this.props.close} alt="close" title="cancel Add" />
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" onChange={this.handleChange} required />
                <label htmlFor="birthday">Birthday</label>
                <input type="text" id="birthday" name="birthday" placeholder="mm/dd/yyyy (year optional)" onChange={this.handleChange} />
                <label htmlFor="favoriteColor">Favorite Color</label>
                <input type="text" id="favoriteColor" name="favoriteColor" onChange={this.handleChange} />
                <label htmlFor="favoriteCandy">Favorite Candy</label>
                <input type="text" id="favoriteCandy" name="favoriteCandy" onChange={this.handleChange} />
                <button type="submit">Add</button>
            </form>
        );
    }
};

export default AddFriend;