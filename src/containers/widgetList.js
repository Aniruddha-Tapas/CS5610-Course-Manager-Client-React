import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from "../actions"
import WidgetContainer from './widgetContainer'


let topicId;

class WidgetList extends Component {
    constructor(props) {
        super(props);

        console.log("WidgetList", props);

        topicId = this.props.match.params.topicId;
        this.props.findAllWidgetsForTopicId(topicId);
    }

    componentDidUpdate(newProps){
        console.log("NewWidgetList", newProps);

        if(this.props.match.params.topicId !== newProps.match.params.topicId) {
            topicId = this.props.match.params.topicId;
            this.props.findAllWidgetsForTopicId(topicId);
        }
    }

    render() {
        return(
            <div className="clearfix container-fluid">
                <nav className="navbar navbar-light justify-content-between" style={{backgroundColor: "#6c757d"}}>
                    <span className="navbar-brand text-white">Widget List</span>
                    <form className="form-inline">
                        <button className="btn-success btn"
                            // hidden={this.props.previewMode}
                                type="button"
                                onClick={this.props.save}>
                            Save
                        </button>
                        &nbsp;
                        <label className="text-white">Preview</label>
                        &nbsp;
                        <label className="switch pull-right my-auto">
                            <input type="checkbox" onClick={this.props.preview} />
                            <span className="slider round"></span>
                        </label>
                    </form>
                </nav>
                <div className="container-fluid">
                    <ul className="list-group list-unstyled">
                        {this.props.widgets.map(widget => (
                            <WidgetContainer widget={widget}
                                             preview={this.props.previewMode}
                                             length={this.props.widgets.length}
                                             key={widget.id}/>
                        ))}
                    </ul>
                </div>
                <div className="clearfix">
                    <button className="btn fa fa-plus-circle btn-danger pull-right"
                            type="button"
                            onClick={this.props.addWidget}/>
                </div>
            </div>
        )
    }
}

const stateToPropertiesMapper = (state) => ({
    widgets: state.widgets,
    previewMode: state.preview
});

const dispatcherToPropsMapper = dispatch => ({
    findAllWidgetsForTopicId: () => actions.findAllWidgetsForTopicId(dispatch, topicId),
    addWidget: () => actions.addWidget(dispatch),
    save: () => actions.save(dispatch, topicId),
    preview: () => actions.preview(dispatch)
});

const App = connect(stateToPropertiesMapper, dispatcherToPropsMapper)(WidgetList);

export default App