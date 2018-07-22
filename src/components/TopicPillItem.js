import React from 'react';

class TopicPillItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="nav-item">
                <div>
                    <a className="nav-link"
                       href="#"> {this.props.topic.title}
                        <span className="float-right text-danger">
                            <i className="fa fa-trash ml-2"
                               onClick={() => this.props.delete(this.props.topic.id)}>
                            </i>
                        </span>
                    </a>
                </div>
            </li>
        );
    }
}

export default TopicPillItem;