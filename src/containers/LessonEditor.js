import React from 'react'
import ModuleService from '../services/ModuleService';
import CourseService from '../services/CourseService';
import LessonService from  '../services/LessonService';
import LessonTabs from './LessonTabs';
import TopicPills from "./TopicPills";

class LessonEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lessonId: '',
            module: '',
            course: '',
            lesson: ''
        }

        this.lessonService = LessonService.instance;
        this.moduleService = ModuleService.instance;
        this.courseService = CourseService.instance;
        this.setCourse = this.setCourse.bind(this);
        this.setModule = this.setModule.bind(this);
        this.setLesson = this.setLesson.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
    }

    componentDidMount() {
        this.setCourse(this.props.match.params.courseId);
        this.setModule(this.props.match.params.moduleId);
        this.setLesson(this.props.match.params.lessonId);
        this.setCourseId(this.props.match.params.courseId);
        this.setModuleId(this.props.match.params.moduleId);
        this.setLessonId(this.props.match.params.lessonId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourse(newProps.match.params.courseId);
        this.setModule(newProps.match.params.moduleId);
        this.setLesson(newProps.match.params.lessonId);
        this.setCourseId(newProps.match.params.courseId);
        this.setModuleId(newProps.match.params.moduleId);
        this.setLesson(newProps.match.params.lessonId);
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

    setLesson(lessonId) {
        this.lessonService
            .findLessonById(lessonId)
            .then((lesson) => {
                this.setState({lesson: lesson})
            })
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }

    render() {
        return (
            <div className=" border border-primary shadow-lg p-3 mb-5 rounded container-fluid p-2" style={{height: '100%'}}>
                <h4 className="container-fluid">Topics of Lesson: {this.state.lesson.title}</h4>

                <TopicPills courseId={this.state.courseId} moduleId={this.state.moduleId} lessonId={this.state.lessonId}/>


            </div>
        )
    }
}

export default LessonEditor;