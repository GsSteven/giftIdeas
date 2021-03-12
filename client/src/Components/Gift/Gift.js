import React from 'react';
import './Gift.css';
import axios from 'axios';

class Gift extends React.Component {
    constructor(props) {
        super(props);
        this.removeGift = this.removeGift.bind(this);
    }

    removeGift() {
        axios.put('/api/gifts', { params: { id: this.props.id, index: this.props.index } })
            .then(response => {
                if (response.status === 200) {
                    this.props.refresh();
                }
            },
                error => {

                });
    }

    render() {
        return (
            <div className="giftWrapper" >
                <p id="removeGift" title={`remove ${this.props.item}`} onClick={this.removeGift}>remove</p>
                <h4 id="giftName">{this.props.item}</h4>

                {this.props.price &&
                    <h4>${this.props.price}</h4>
                }

                {this.props.description &&
                    <p>{this.props.description}</p>
                }

                {this.props.link &&
                    <a href={this.props.link} target="_blank" rel="noreferrer">Link</a>
                }

            </div>
        );
    }
};

export default Gift;