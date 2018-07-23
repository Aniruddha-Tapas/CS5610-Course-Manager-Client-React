import React from 'react';
import {Link} from 'react-router-dom';

class LessonTabItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="nav-item">
                <Link className="nav-link text-dark" to={`/course/${this.props.courseId}/edit/${this.props.moduleId}/edit/${this.props.lesson.id}/edit`}>
                    {this.props.lesson.title}
                    <span className="float-right">
                    <i className="fa fa-trash ml-2 text-danger"
                       onClick={() => this.props.delete(this.props.lesson.id)}>
                    </i>
                </span>
                </Link>

            </li>
        );
    }
}

export default LessonTabItem;
