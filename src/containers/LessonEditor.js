import React from 'react'
import ModuleService from '../services/ModuleService';
import CourseService from '../services/CourseService';
import LessonService from '../services/LessonService';
import TopicPills from "./TopicPills";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {widgetReducer} from "../reducers/widgetReducer";
import App from './widgetList';


let store = createStore(widgetReducer);

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
        };

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
        this.setLessonId(newProps.match.params.lessonId);
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
            <Router>
                <div className=" border border-primary shadow-lg p-3 mb-5 rounded container-fluid p-2 h-100">
                    <h4 className="container-fluid">Topics of Lesson: {this.state.lesson.title}</h4>
                    <div>
                        <TopicPills courseId={this.state.courseId}
                                    moduleId={this.state.moduleId}
                                    lessonId={this.state.lessonId}/>
                    </div>
                    <div className="h-100">
                        <Provider store={store}>
                            <Route path="/course/:courseId/edit/:moduleId/edit/:lessonId/edit/:topicsId/edit"
                                   component={App}/>
                        </Provider>
                    </div>
                </div>
            </Router>
        )
    }
}

export default LessonEditor;