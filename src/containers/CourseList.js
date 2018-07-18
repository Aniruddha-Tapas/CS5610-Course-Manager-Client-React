import React from 'react';
import CourseRow from "../components/CourseRow";
import CourseService from "../services/CourseService";

class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
    }

    componentDidMount() {
        this.findAllCourses();
    }

    findAllCourses() {
        this.courseService
            .findAllCourses()
            .then((courses) => {
                //console.log(courses);
                this.setState({courses: courses});
            })
    }

    renderCourseRows() {
        let courses = null;

        //console.log("render course rows")
        //console.log(this.state)
        if (this.state) {
            courses = this.state.courses.map(
                function (course) {
                    return <CourseRow key={course.id}
                                      course={course}
                                      delete={this.deleteCourse}/>
                }
                , this)
        }
        return (
            courses
        )
    }

    titleChanged(event) {
        this.setState({
            course: {title: event.target.value}
        });
    }

    createCourse() {
        this.courseService
            .createCourse(this.state.course)
            .then(() => {
                this.findAllCourses();
            });
    }

    deleteCourse(courseId) {
        this.courseService
            .deleteCourse(courseId)
            .then(() => this.findAllCourses());
    }

    render() {
        return (
            <div className="container-fluid">
                <nav className="navbar navbar-dark bg-primary justify-content-between">
                    <h1 style={{color: "white"}}>Course Manager</h1>
                    <form className="form-inline">
                        <input onChange={this.titleChanged} className="form-control mr-sm-2" id="titleFld"
                               placeholder="Add Course Title"/>
                        <button className="btn btn-success my-2 my-sm-0" onClick={this.createCourse} type="button">Add
                        </button>
                    </form>
                </nav>
                <h2>CourseList</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Created On</th>
                        <th>Last Modified</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderCourseRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CourseList;