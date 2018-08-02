import React from 'react'
import {connect} from 'react-redux'
import * as actions from "../actions"
import WidgetContainer from './widgetContainer'


let topicId;

class WidgetList extends React.Component {
    constructor(props) {
        super(props);
        topicId = this.props.match.params.topicId;
        this.props.findAllWidgetsForTopicId(topicId);
    }

    componentDidUpdate(newProps){
        if(this.props.match.params.topicId !== newProps.match.params.topicId) {
            topicId = this.props.match.params.topicId;
            this.props.findAllWidgetsForTopicId(topicId);
        }
    }

    render() {
        return(
            <div className="clearfix container-fluid border border-secondary shadow-lg p-2 mt-2 rounded">
                <nav className="navbar navbar-light justify-content-between">
                    <span className="navbar-brand">Widget List</span>
                    <form className="form-inline">
                        <button className="btn-success btn"
                            // hidden={this.props.previewMode}
                                type="button"
                                onClick={this.props.save}>
                            Save
                        </button>
                        &nbsp;
                        <label className="">Preview</label>
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
                <div className="clearfix container-fluid">
                    <button className="btn fa fa-plus-circle btn-danger float-right"
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