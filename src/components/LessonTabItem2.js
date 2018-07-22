
import React from 'react';

class LessonTabItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="nav-item">
                <div>
                    <a className="nav-link text-dark"
                       href="#"> {this.props.lesson.title}
                        <span className="float-right text-dark">
                            <i className="fa fa-trash ml-2"
                               onClick={() => this.props.delete(this.props.lesson.id)}>
                            </i>
                        </span>
                    </a>
                </div>
            </li>
        );
    }
}

export default LessonTabItem;