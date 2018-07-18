import React, {Component} from 'react'
import ModuleService from '../services/ModuleService'
import ModuleListItem from '../components/ModuleListItem';

class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            module: { title: '' },
            modules: []
        };
        this.moduleService = ModuleService.instance;
        this.createModule = this.createModule.bind(this);
        this.deleteModule = this.createModule.bind(this);
        this.moduleTitleChanged = this.moduleTitleChanged.bind(this);
        this.setCourseId =
            this.setCourseId.bind(this);

    }
    setModules(modules) {
        this.setState({modules: modules})
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)});
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }
    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId)
    }

    createModule() {
        //console.log(this.state.module);
        this.moduleService
            .createModule(this.props.courseId, this.state.module)
            .then(() => this.findAllModulesForCourse(this.state.courseId));
    }

    deleteModule(moduleId){
        this.moduleService
            .deleteModule(moduleId)
            .then(() => this.findAllModulesForCourse(this.state.courseId));
    }

    moduleTitleChanged(event) {
        //console.log(event.target.value);
        this.setState({module: {title: event.target.value}});
    }

    renderListOfModules() {
        let modules = this.state.modules.map(function(module){
            return <ModuleListItem module={module}
                                   key={module.id}
            delete = {this.deleteModule}/>
        });
        return modules;
    }
    render() {
        return (
            <div>
                <h4>Module List for course: {this.state.courseId}</h4>
                <input onChange={this.moduleTitleChanged}
                       placeholder="New Module Name"
                       className="form-control mr-sm-2 mb-2"/>
                <button type="button"
                        onClick={this.createModule}
                        className="btn btn-outline-primary btn-block">
                    <i className="fa fa-plus"></i>
                    Create
                </button>
                <br/>
                <ul className="list-group">
                    {this.renderListOfModules()}
                </ul>
            </div>
        );
    }
}

export default ModuleList;