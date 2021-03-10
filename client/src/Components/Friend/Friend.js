import React from 'react';
import './Friend.css';

//img imports
import expandArrow from './../../images/arrow.png';


class Friend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandFriend: false,

        }
        this.expandFriend = this.expandFriend.bind(this);
    }

    expandFriend() {
        const arrowIcon = document.getElementById(this.props.id).childNodes[2];

        if (this.state.expandFriend) {
            this.setState({ expandFriend: false });
            arrowIcon.className = '';
        } else {
            this.setState({ expandFriend: true });
            arrowIcon.className = 'rotateArrow';
        }
    }

    getGifts() {
        if (this.props.gifts) {

        }
    }

    render() {
        return (
            <div className="friendWrapper">
                <h3 id={this.props.id} onClick={this.expandFriend}>
                    {this.props.name}
                    <span className="birthday">{this.props.birthday}</span>
                    <img src={expandArrow} id="expandArrow" alt="expand" />
                </h3>
                {this.state.expandFriend &&
                    <div>
                        <h4>Favorite Color: {this.props.favoriteColor}</h4>
                        <h4>Favorite Candy: {this.props.favoriteCandy}</h4>
                        <div id="addGiftButton">+</div>
                        <div id="giftsList">
                            {this.getGifts()}
                        </div>
                    </div>
                }
            </div>
        );
    }
};

export default Friend;