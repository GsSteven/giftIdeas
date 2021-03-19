import React from 'react';
import './EditFriend.css';
import axios from 'axios';

//img imports
import closeButton from './../../images/xButton.png';

class EditFriend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleChange = this.handleChange.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    submitEdit(e) {
        e.preventDefault();
        const payLoad = this.state;
        axios.put('/api/friends', { id: this.props.id, params: payLoad })
            .then(response => {
                if (response.status === 200) {
                    this.props.refresh();
                    this.props.close();
                }
            },
                error => {

                });
    }


    render() {
        return (
            <form className="editFriendForm" autoComplete="off" onSubmit={this.submitEdit}>
                <img id="closeEditFriend" src={closeButton} onClick={this.props.close} alt="close" title="Cancel Add" />
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={this.handleChange}
                    defaultValue={this.props.name}
                    required
                />
                <label htmlFor="birthday">Birthday</label>
                <input
                    type="text"
                    id="birthday"
                    name="birthday"
                    placeholder="mm/dd"
                    onChange={this.handleChange}
                    pattern="[0-1] + [0-9] + [/] + [0-3] + [0-9]"
                    title="Must be mm/dd format"
                    defaultValue={this.props.birthday}
                />
                <label htmlFor="favoriteColor">Favorite Color</label>
                <input
                    type="text"
                    id="favoriteColor"
                    name="favoriteColor"
                    onChange={this.handleChange}
                    defaultValue={this.props.favoriteColor}
                />
                <label htmlFor="favoriteCandy">Favorite Candy</label>
                <input
                    type="text"
                    id="favoriteCandy"
                    name="favoriteCandy"
                    onChange={this.handleChange}
                    defaultValue={this.props.favoriteCandy}
                />
                <button type="submit">Confirm</button>
            </form>
        );
    }
};

export default EditFriend;