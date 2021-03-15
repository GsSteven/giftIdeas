import React from 'react';
import './Friend.css';
import axios from 'axios';
import AddGift from './../AddGift/AddGift';
import Gift from '../Gift/Gift';
import EditFriend from '../EditFriend/EditFriend';

//img imports
import remove from './../../images/subtract.png';
import expandArrow from './../../images/arrow.png';
import edit from './../../images/gear.png';



class Friend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandFriend: false,
            expandAddGift: false,
            expandEdit: false,
            verifyRemove: false,
            errorRemoving: false
        }
        this.expandFriend = this.expandFriend.bind(this);
        this.expandAddGift = this.expandAddGift.bind(this);
        this.expandEdit = this.expandEdit.bind(this);
        this.verifyRemove = this.verifyRemove.bind(this);
        this.deleteFriend = this.deleteFriend.bind(this);
        this.highlightCurrentBirthdayMonth = this.highlightCurrentBirthdayMonth.bind(this);
    }

    expandFriend() {
        const arrowIcon = document.getElementById(this.props.id).childNodes[2];

        if (this.state.expandFriend) {
            this.setState({ expandFriend: false, expandAddGift: false });
            arrowIcon.className = '';
        } else {
            this.setState({ expandFriend: true });
            arrowIcon.className = 'rotateArrow';
        }
    }

    expandAddGift() {
        this.state.expandAddGift ? this.setState({ expandAddGift: false }) : this.setState({ expandAddGift: true });
    }

    expandEdit() {
        this.state.expandEdit ? this.setState({ expandEdit: false }) : this.setState({ expandEdit: true });
    }

    verifyRemove() {
        this.state.verifyRemove ? this.setState({ verifyRemove: false }) : this.setState({ verifyRemove: true });
    }

    deleteFriend() {
        axios.delete('/api/friends', { params: { id: this.props.id } })
            .then(response => {
                if (response.status === 200) {
                    this.props.refresh();
                    this.setState({ verifyRemove: false });
                }
            },
                error => {
                    this.setState({ errorRemoving: true });
                });
    }

    highlightCurrentBirthdayMonth() {
        if (this.props.birthday) {
            const d = new Date();
            const currentMonth = (d.getMonth() + 1).toString();
            const birthdayDisplay = document.getElementById(`birthday${this.props.id}`);
            const birthdayMonth = this.props.birthday.slice(0, 2);
            if (birthdayMonth === currentMonth || birthdayMonth === `0${currentMonth}`) {
                birthdayDisplay.style.color = 'red';
            }
        }
    }

    componentDidMount() {
        this.highlightCurrentBirthdayMonth();
    }

    render() {
        let gifts;
        if (this.props.gifts[0]) {
            gifts = this.props.gifts.map((gift, index) => {
                return <Gift
                    item={gift.item}
                    description={gift.description}
                    price={gift.price}
                    link={gift.link}
                    id={this.props.id}
                    index={index}
                    key={gift.item + gift.link}
                    refresh={this.props.refresh}
                />
            });
        }

        return (
            <div className="friendWrapper">
                <img className="removeFriend" src={remove} alt="remove friend" title={`Remove ${this.props.name}`} onClick={this.verifyRemove} />
                <img className="editFriend" src={edit} alt="edit friend" title={`Edit ${this.props.name}`} onClick={this.expandEdit} />
                {this.state.verifyRemove &&
                    <div className="verifyRemove">
                        <h5>Remove {this.props.name}?</h5>
                        <button type="button" id="yesButton" onClick={this.deleteFriend}>Yes</button>
                        <button type="button" id="noButton" onClick={this.verifyRemove}>No</button>
                    </div>
                }
                <div className="friend">
                    <h3 id={this.props.id} onClick={this.expandFriend}>
                        {this.props.name}
                        <span className="birthday" id={`birthday${this.props.id}`}>{this.props.birthday}</span>
                        <img src={expandArrow} id="expandArrow" alt="expand" />
                    </h3>
                    {this.state.expandFriend &&
                        <div>
                            {this.props.favoriteColor &&
                                <h4>Favorite Color: {this.props.favoriteColor}</h4>
                            }
                            {this.props.favoriteCandy &&
                                <h4>Favorite Candy: {this.props.favoriteCandy}</h4>
                            }
                            <div id="addGiftButton" onClick={this.expandAddGift} title="Add Gift Idea">+</div>
                            {this.state.expandAddGift &&
                                <AddGift
                                    id={this.props.id}
                                    refresh={this.props.refresh}
                                    close={this.expandAddGift}
                                />
                            }
                            <div id="giftsList">
                                {gifts}
                            </div>
                        </div>
                    }
                </div>
                {this.state.expandEdit &&
                    <EditFriend
                        name={this.props.name}
                        birthday={this.props.birthday}
                        favoriteColor={this.props.favoriteColor}
                        favoriteCandy={this.props.favoriteCandy}
                        id={this.props.id}
                        close={this.expandEdit}
                        refresh={this.props.refresh}
                        key={this.props.id + this.props.name}
                    />
                }
            </div>
        );
    }
};

export default Friend;