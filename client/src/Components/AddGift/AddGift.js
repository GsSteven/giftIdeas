import React from 'react';
import './AddGift.css';
import axios from 'axios';

//img imports
import closeButton from './../../images/xButton.png';

class AddGift extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,

        }
        this.handleChange = this.handleChange.bind(this);
        this.addGift = this.addGift.bind(this);
    }

    addGift(e) {
        e.preventDefault();
        const payLoad = this.state;
        axios.post('/api/gifts', { data: payLoad })
            .then(response => {
                if (response.status === 200) {
                    this.props.refresh();
                    this.props.close();
                }
            },
                error => {
                    console.log(error);
                });
    }

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({ [name]: value });
    }

    componentDidMount() {
        const nameInput = document.getElementById(`gift${this.props.id}`);
        nameInput.focus();
    }

    render() {
        return (
            <form className="addGiftWrapper" onSubmit={this.addGift} autoComplete="off">
                <img id="closeAddGift" src={closeButton} alt="close" onClick={this.props.close} />
                <label htmlFor="item">Item</label>
                <input
                    type="text"
                    id={`gift${this.props.id}`}
                    name="item"
                    onChange={this.handleChange}
                    required
                />
                <label htmlFor="description">Description</label>
                <textarea
                    type="text"
                    id="description"
                    name="description"
                    rows="5"
                    onChange={this.handleChange}
                />
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    step="0.01"
                    id="price"
                    name="price"
                    onChange={this.handleChange}
                />
                <label htmlFor="link">URL to product</label>
                <input
                    type="text"
                    id="link"
                    name="link"
                    onChange={this.handleChange}
                />
                <button type="submit">Add</button>
            </form>
        );
    }
};

export default AddGift;