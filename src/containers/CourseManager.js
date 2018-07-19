import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CourseList from "./CourseList";
import CourseEditor from './CourseEditor'

class CourseManager extends Component{
    render() {
        return (
            <Router>
                <div style={{height: '100%'}}>
                    <Route path="/courses"
                           component={CourseList}>
                    </Route>

                    <Route path="/course/:courseId/edit"
                           component={CourseEditor}>
                    </Route>

                </div>
            </Router>
        )
    }
}

export default CourseManager;