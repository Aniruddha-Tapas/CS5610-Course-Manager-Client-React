import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from "../actions"
import WidgetContainer from './widgetContainer'


let lessonId;

class WidgetList extends Component {
    constructor(props) {
        super(props);
        lessonId = this.props.match.params.lessonId;
        this.props.findAllWidgetsForLessonId(lessonId);
    }

    componentDidUpdate(newProps){
        if(this.props.match.params.lessonId !== newProps.match.params.lessonId) {
            lessonId = this.props.match.params.lessonId;
            this.props.findAllWidgetsForLessonId(lessonId);
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
    findAllWidgetsForLessonId: () => actions.findAllWidgetsForLessonId(dispatch, lessonId),
    addWidget: () => actions.addWidget(dispatch),
    save: () => actions.save(dispatch, lessonId),
    preview: () => actions.preview(dispatch)
});

const App = connect(stateToPropertiesMapper, dispatcherToPropsMapper)(WidgetList);

export default App