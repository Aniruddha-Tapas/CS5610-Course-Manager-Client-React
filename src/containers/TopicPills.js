import React, {Component} from 'react';
import TopicService from '../services/TopicService'
import TopicPillItem from "../components/TopicPillItem";

class TopicPills extends Component {

    constructor(props) {
        super(props);

        this.topicService = TopicService.instance;
        this.createTopic = this.createTopic.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.setTopicTitle = this.setTopicTitle.bind(this);
        this.state = {
            courseId: '',
            moduleId: '',
            lessonId: '',
            lessonTitle: '',
            topics: [],
            topic: {
                title: ''
            }
        }
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.setLessonId(this.props.lessonId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.setLessonId(newProps.lessonId);
        this.findAllTopicsForLesson(newProps.courseId, newProps.moduleId, newProps.lessonId);
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

    createTopic() {
        if (this.state.topic.title === "") {
            this.topicService
                .createTopic(
                    this.state.courseId,
                    this.state.moduleId,
                    this.state.lessonId, {
                        title: 'Default Topic'
                    })
                .then(() =>
                    this.findAllTopicsForLesson(
                        this.state.courseId,
                        this.state.moduleId,
                        this.state.lessonId));
        }
        else {
            this.topicService
                .createTopic(
                    this.state.courseId,
                    this.state.moduleId,
                    this.state.lessonId,
                    this.state.topic)
                .then(() =>
                    this.findAllTopicsForLesson(
                        this.state.courseId,
                        this.state.moduleId,
                        this.state.lessonId));
        }
    }

    deleteTopic(topicId) {
        if (window.confirm("Do you want to delete this topic?")) {
            this.topicService
                .deleteTopic(topicId)
                .then(() =>
                    this.findAllTopicsForLesson(
                        this.state.courseId,
                        this.state.moduleId,
                        this.state.lessonId));
        }
    }

    setTopicTitle(event) {
        this.setState({
            topic: {
                title: event.target.value
            }
        });
    }

    findAllTopicsForLesson(courseId, moduleId, lessonId) {
        this.topicService
            .findAllTopicsForLesson(courseId, moduleId, lessonId)
            .then((topics) => {
                this.setState({topics: topics})
            });
    }

    renderListOfTopics() {
        let topics = null;

        if (this.state.topics) {
            topics = this.state.topics.map(
                function (topic) {
                    return (<TopicPillItem key={topic.id}
                                           topic={topic}
                                           courseId = {this.state.courseId}
                                           moduleId = {this.state.moduleId}
                                           lessonId = {this.state.lessonId}
                                           delete={this.deleteTopic}/>)
                }, this);
        }
        return (topics)
    }

    render() {
        return (
            <div className="h-100 w-100">
                <nav className="navbar justify-content-between">
                    <form className="form-inline w-100">
                        <input placeholder="New Topic Title"
                               className="form-control border"
                               onChange={this.setTopicTitle}
                               style={{width: '80%'}}/>
                        <button type="button"
                                className="btn btn-outline-success btn-block ml-4"
                                onClick={this.createTopic}
                                style={{width: '15%'}}>
                            Create
                        </button>
                    </form>
                </nav>

                <hr className="bg-white"/>

                <div className="container-fluid h-100 w-100">
                    <ul className="nav nav-pills">
                        {this.renderListOfTopics()}
                    </ul>
                </div>

            </div>
        )
    }
}

export default TopicPills;