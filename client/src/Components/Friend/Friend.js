
import './Friend.css';

function Friend(props) {
    return (
        <div className="friendWrapper">
            {props.name}
        </div>
    );
};

export default Friend;