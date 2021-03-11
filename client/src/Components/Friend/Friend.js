import React from 'react';
import './Friend.css';
import AddGift from './../AddGift/AddGift';

//img imports
import expandArrow from './../../images/arrow.png';
import Gift from '../Gift/Gift';


class Friend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandFriend: false,
            expandAddGift: false,
        }
        this.expandFriend = this.expandFriend.bind(this);
        this.expandAddGift = this.expandAddGift.bind(this);
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
                <h3 id={this.props.id} onClick={this.expandFriend}>
                    {this.props.name}
                    <span className="birthday">{this.props.birthday}</span>
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
                        <div id="addGiftButton" onClick={this.expandAddGift}>+</div>
                        {this.state.expandAddGift &&
                            <AddGift id={this.props.id} refresh={this.props.refresh} close={this.expandAddGift} />
                        }
                        <div id="giftsList">
                            {gifts}
                        </div>
                    </div>
                }
            </div>
        );
    }
};

export default Friend;