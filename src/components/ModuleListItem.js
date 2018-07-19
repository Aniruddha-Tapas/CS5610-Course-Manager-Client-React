import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ModuleListItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="list-group-item m-1">
                <Link to={`/course/${this.props.courseId}/edit/${this.props.module.id}/edit`}>
                    {this.props.module.title}
                </Link>
                <span className="float-right text-dark">
                    <i className="fa fa-trash"
                       onClick={() => this.props.delete(this.props.module.id)}>
                    </i>
                </span>
            </li>
        );
    }
}

export default ModuleListItem;