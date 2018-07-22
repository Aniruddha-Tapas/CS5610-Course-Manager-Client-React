import React from 'react';
import CourseRow from "../components/CourseRow";
import CourseService from "../services/CourseService";

class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
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
        document.body.style.backgroundColor = "#e9ecef";
        return (
            <div className="bg-light">
                <nav className="navbar navbar-dark bg-primary justify-content-between">
                    <h1 style={{color: "white"}}>WhiteBoard</h1>
                    <form className="form-inline">
                        <input onChange={this.titleChanged}
                               className="form-control mr-sm-2"
                               id="titleFld"
                               placeholder="New Course Title"/>
                        <button className="btn btn-success my-2 my-sm-0"
                                onClick={this.createCourse}
                                type="button">Add
                        </button>
                    </form>
                </nav>
                <div className="jumbotron">
                    <h3>List of Courses:</h3>
                    <table className="table shadow-lg p-3 mb-5 bg-white rounded">
                        <thead className="bg-white">
                        <tr>
                            <th>Title</th>
                            <th>Created On</th>
                            <th>Last Modified</th>
                            <th>&nbsp;</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {this.renderCourseRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default CourseList;