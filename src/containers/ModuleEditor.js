import React from 'react'
import ModuleService from '../services/ModuleService';
import CourseService from '../services/CourseService';
import LessonTabs from './LessonTabs'

class ModuleEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            module: '',
            course: ''
        };
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
            <div className=" border border-primary shadow-lg p-3 mb-5 rounded container-fluid p-2 h-100">
                <h4 className="container-fluid">Lessons of Module: {this.state.module.title}</h4>
                <LessonTabs moduleId={this.state.moduleId} courseId={this.state.courseId}/>
            </div>
        )
    }
}

export default ModuleEditor;