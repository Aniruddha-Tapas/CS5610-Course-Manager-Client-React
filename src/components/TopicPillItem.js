import React from 'react';
import {Link} from 'react-router-dom';

class TopicPillItem extends React.Component {
    render() {
        return (
            <li className="nav-item">
                <Link className="nav-link text-primary"
                      to={`/course/${this.props.courseId}/edit/${this.props.moduleId}/edit/${this.props.lessonId}/edit/${this.props.topic.id}/edit`}>
                    {this.props.topic.title}
                    <span className="float-right">
                        <i className="fa fa-trash ml-2 text-danger"
                           onClick={() => this.props.delete(this.props.topic.id)}>
                        </i>
                    </span>
                </Link>
            </li>
        );
    }
}

export default TopicPillItem;