import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import CourseService from '../services/CourseService';
import ModuleList from './ModuleList';
import ModuleEditor from './ModuleEditor';

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
        document.body.style.backgroundColor = "#6c757d";
        return (
            <Router>
                <div style={{height: '100%'}}>
                    <div className="bg-dark text-white container-fluid">
                        <h1>{this.state.course.title}</h1>
                    </div>
                    <div className="row" style={{height: '100%'}}>
                        <div className="col-4 bg-dark text-white" style={{height: '100%'}}>
                            <ModuleList courseId={this.state.courseId}
                                        courseTitle={this.state.course.title}/>
                        </div>
                        <div className="col-8 text-white" style={{height: '100%', width: '100%'}}>
                            <Route path="/course/:courseId/edit/:moduleId/edit"
                                   component={ModuleEditor}>
                            </Route>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default CourseEditor;