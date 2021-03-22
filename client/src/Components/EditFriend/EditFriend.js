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
        if (this.state.month && this.state.day) {
            payLoad.birthday = `${this.state.month}/${this.state.day}`
        }
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
        const birthday = this.props.birthday;
        let month;
        let day;
        if (birthday) {
            const splitBirthday = birthday.split('/');
            month = splitBirthday[0];
            day = splitBirthday[1];
        }

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
                <div id="birthday">
                    <div id="monthSelect">
                        <label htmlFor="month"><u>Month</u></label>
                        <select id="month" name="month" defaultValue={month} onChange={this.handleChange}>
                            <option value='01'>01</option>
                            <option value='02'>02</option>
                            <option value='03'>03</option>
                            <option value='04'>04</option>
                            <option value='05'>05</option>
                            <option value='06'>06</option>
                            <option value='07'>07</option>
                            <option value='08'>08</option>
                            <option value='09'>09</option>
                            <option value='10'>10</option>
                            <option value='11'>11</option>
                            <option value='12'>12</option>
                        </select>
                    </div>
                    <div id="daySelect">
                        <label htmlFor="day"><u>Day</u></label>
                        <select id="day" name="day" defaultValue={day} onChange={this.handleChange}>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>
                    </div>
                </div>
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