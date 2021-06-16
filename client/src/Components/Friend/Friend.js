import React from 'react';
import { motion } from "framer-motion";
import './Friend.css';
import AddGift from './../AddGift/AddGift';
import Gift from '../Gift/Gift';
import EditFriend from '../EditFriend/EditFriend';

//img imports
import expandArrow from './../../images/arrow.png';
import edit from './../../images/gear.png';



class Friend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandFriend: false,
            expandAddGift: false,
            expandEdit: false,
        }
        this.expandFriend = this.expandFriend.bind(this);
        this.expandAddGift = this.expandAddGift.bind(this);
        this.expandEdit = this.expandEdit.bind(this);
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
                <motion.img
                    className="editFriend"
                    src={edit} alt="edit friend"
                    title={`Edit ${this.props.name}`}
                    onClick={this.expandEdit}
                    whileHover={{ rotate: 45 }}
                    transition={{ type: "spring", stiffness: 200 }}
                />
                <div className="friend">
                    <h3 id={this.props.id} onClick={this.expandFriend}>
                        {this.props.name}
                        <span className="birthday" id={`birthday${this.props.id}`}>{this.props.birthday}</span>
                        <img src={expandArrow} id="expandArrow" alt="expand" />
                    </h3>
                    {this.state.expandFriend &&
                        <motion.div
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: .4, type: "spring", stiffness: 150 }}
                        >
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
                        </motion.div>
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