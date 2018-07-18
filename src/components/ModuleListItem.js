import React, {Component} from 'react';

class ModuleListItem extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <li className="list-group-item">
                {this.props.module.title}
                <span className="float-right">
                    <i className="fa fa-trash" onClick={() => this.props.delete(this.props.module.id)}></i>
                </span>
            </li>
        );
    }
}

export default ModuleListItem;