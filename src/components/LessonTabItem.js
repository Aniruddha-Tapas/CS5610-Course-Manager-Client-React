import React from 'react';

class ModuleListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="nav-item">
                <div>
                    <a className="nav-link text-white"
                       href="#"> {this.props.lesson.title}
                        <span className="float-right">
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

export default ModuleListItem;