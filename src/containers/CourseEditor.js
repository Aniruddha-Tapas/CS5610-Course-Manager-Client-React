import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import CourseService from '../services/CourseService';
import ModuleList from './ModuleList';
import ModuleEditor from './ModuleEditor';
import LessonEditor from "./LessonEditor";


class CourseEditor extends Component {

    constructor(props) {
        super(props);
        this.courseService = CourseService.instance;
        this.state = {
            courseId: '',
            course: ''
        };
        this.selectCourse = this.selectCourse.bind(this);
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
        this.getCourse(this.props.match.params.courseId);
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    getCourse(courseId) {
        this.courseService
            .findCourseById(courseId)
            .then((course) => {
                this.setState({course: course})
            })
    }

    render() {
        return (
            <Router>
                <div>
                    <div className="navbar navbar-dark bg-primary text-white mb-5 justify-content-between">
                        <h1>Course: {this.state.course.title}</h1>
                    </div>
                    <div className="container-fluid" tyle={{height: '100%'}}>

                        <div className="row m-1" style={{height: '100%', width: '100%'}}>
                            <div className="col-4 border border-primary shadow-lg p-3 mb-5 rounded" style={{height: '100%'}}>
                                <ModuleList courseId={this.state.courseId}
                                            courseTitle={this.state.course.title}/>
                            </div>
                            <div className="col-8" style={{height: '100%', width: '100%'}}>
                                <Route path="/course/:courseId/edit/:moduleId/edit"
                                       component={ModuleEditor}>
                                </Route>

                                <Route path="/course/:courseId/edit/:moduleId/edit/:lessonId/edit"
                                       component={LessonEditor}>
                                </Route>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default CourseEditor;