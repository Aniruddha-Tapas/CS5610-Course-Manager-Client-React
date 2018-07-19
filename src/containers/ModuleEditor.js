import React from 'react'
import LessonTabs from './LessonTabs'
import ModuleService from '../services/ModuleService';
import CourseService from '../services/CourseService';

class ModuleEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            module: '',
            course: ''
        }
        this.moduleService = ModuleService.instance;
        this.courseService = CourseService.instance;
        this.setCourse = this.setCourse.bind(this);
        this.setModule = this.setModule.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
    }

    componentDidMount() {
        this.setCourse(this.props.match.params.courseId);
        this.setModule(this.props.match.params.moduleId);
        this.setCourseId(this.props.match.params.courseId);
        this.setModuleId(this.props.match.params.moduleId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourse(newProps.match.params.courseId);
        this.setModule(newProps.match.params.moduleId);
        this.setCourseId(newProps.match.params.courseId);
        this.setModuleId(newProps.match.params.moduleId);
    }

    setCourse(courseId) {
        this.courseService
            .findCourseById(courseId)
            .then((course) => {
                this.setState({course: course})
            })
    }

    setModule(moduleId) {
        this.moduleService
            .findModuleById(moduleId)
            .then((module) => {
                this.setState({module: module})
            })
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    render() {
        return (
            <div className="bg-dark container-fluid p-2" style={{height: '100%'}}>
                <h4 className="container-fluid">Editing Module: {this.state.module.title}</h4>
                <LessonTabs moduleId={this.state.moduleId}/>
            </div>
        )
    }
}

export default ModuleEditor;