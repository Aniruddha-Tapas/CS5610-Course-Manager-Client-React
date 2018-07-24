import React, {Component} from 'react';
import LessonService from '../services/LessonService';
import LessonTabItem from '../components/LessonTabItem'

class LessonTabs extends Component {

    constructor(props) {
        super(props);
        this.lessonService = LessonService.instance;
        this.createLesson = this.createLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.setLessonTitle = this.setLessonTitle.bind(this);
        this.state = {
            courseId: '',
            moduleId: '',
            moduleTitle: '',
            lessons: [],
            lesson: {
                title: ''
            }
        }
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.findAllLessonsForModule(newProps.courseId, newProps.moduleId);
    }

    createLesson() {
        if (this.state.lesson.title === '') {
            this.lessonService
                .createLesson(
                    this.state.courseId,
                    this.state.moduleId, {
                        title: 'Default Lesson'
                    })
                .then(() => this.findAllLessonsForModule(this.state.courseId, this.state.moduleId));
        }
        else {
            this.lessonService
                .createLesson(
                    this.state.courseId,
                    this.state.moduleId,
                    this.state.lesson)
                .then(() => this.findAllLessonsForModule(this.state.courseId, this.state.moduleId));
        }
    }

    deleteLesson(lessonId) {
        if (window.confirm("Do you want to delete this lesson?")) {
            this.lessonService
                .deleteLesson(lessonId)
                .then(() => this.findAllLessonsForModule(this.state.courseId, this.state.moduleId))
        }
    }

    setLessonTitle(event) {
        this.setState({
            lesson: {
                title: event.target.value
            }
        });
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    findAllLessonsForModule(courseId, moduleId) {
        this.lessonService
            .findAllLessonsForModule(courseId, moduleId)
            .then((lessons) => {
                this.setState({lessons: lessons})
            });
    }

    renderListOfLessons() {
        let lessons = null;

        if (this.state.lessons) {
            lessons = this.state.lessons.map(
                function (lesson) {
                    return (<LessonTabItem key={lesson.id}
                                           lesson={lesson}
                                           courseId={this.state.courseId}
                                           moduleId={this.state.moduleId}
                                           delete={this.deleteLesson}/>)
                }, this);
        }
        return (lessons);
    }


    render() {
        return (
            <div className="h-100 w-100">
                <nav className="navbar justify-content-between">
                    <form className="form-inline w-100">
                        <input placeholder="New Lesson Title"
                               className="form-control border"
                               onChange={this.setLessonTitle}
                               style={{width: '80%'}}/>
                        <button type="button"
                                className="btn btn-outline-success btn-block ml-4"
                                onClick={this.createLesson}
                                style={{width: '15%'}}>
                            Create
                        </button>
                    </form>
                </nav>

                <hr className="bg-white"/>

                <div className="container-fluid h-100 w-100">
                    <ul className="nav nav-tabs">
                        {this.renderListOfLessons()}
                    </ul>
                </div>

            </div>
        )
    }
}

export default LessonTabs;