import React, {Component} from 'react';
import ModuleService from '../services/ModuleService';
import ModuleListItem from '../components/ModuleListItem';

class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            courseTitle: '',
            module: {title: ''},
            modules: []
        };
        this.moduleService = ModuleService.instance;
        this.createModule = this.createModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleTitle = this.setModuleTitle.bind(this);
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setCourseTitle(this.props.courseTitle);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.setCourseTitle(newProps.courseTitle);
        this.findAllModulesForCourse(newProps.courseId);
    }

    createModule() {
        if (this.state.module.title === "") {
            this.moduleService
                .createModule(this.state.courseId, {title: "Default Module"})
                .then(() => this.findAllModulesForCourse(this.state.courseId));
        } else {
            this.moduleService
                .createModule(this.state.courseId, this.state.module)
                .then(() => this.findAllModulesForCourse(this.state.courseId));
        }
    }

    deleteModule(moduleId) {
        if (window.confirm("Do you want to delete this module?")) {
            this.moduleService
                .deleteModule(moduleId)
                .then(() => this.findAllModulesForCourse(this.state.courseId));
        }
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setCourseTitle(courseTitle) {
        this.setState({courseTitle: courseTitle})
    }

    setModules(modules) {
        this.setState({modules: modules})
    }

    setModuleTitle(event) {
        this.setState({
            module: {
                title: event.target.value
            }
        });
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {
                this.setState({modules: modules})
            });
    }

    renderListOfModules() {
        let modules = null;

        if (this.state) {
            modules = this.state.modules.map(
                function (module) {
                    return (<ModuleListItem key={module.id}
                                            module={module}
                                            courseId={this.state.courseId}
                                            delete={this.deleteModule}/>)
                }, this);
        }
        return (modules);
    }

    render() {
        return (
            <div className="p-2 m-1">
                <h4>Modules of {this.state.courseTitle}</h4>
                <input placeholder="New Module Title"
                       className="form-control mr-sm-2 mb-2 border"
                       onChange={this.setModuleTitle}>
                </input>
                <button type="button"
                        className="btn btn-outline-success btn-block"
                        onClick={this.createModule}>
                    Create
                </button>
                <br/>
                <ul className="list-group">
                    {this.renderListOfModules()}
                </ul>
            </div>
        )
    }
}

export default ModuleList;