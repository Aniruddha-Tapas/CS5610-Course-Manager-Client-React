import React, {Component} from 'react';
import TopicService from  '../services/TopicService'
import TopicPillItem from "../components/TopicPillItem";

class TopicPills extends Component {

    constructor(props) {
        super(props);

        this.topicService = TopicService.instance;
        this.createTopic = this.createTopic.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.setTopicTitle = this.setTopicTitle.bind(this);
        this.state = {
            lessonId: '',
            lessonTitle: '',
            topics: [],
            topic: {
                title: ''
            }
        }
    }

    componentDidMount() {
        this.setLessonId(this.props.lessonId);
    }

    componentWillReceiveProps(newProps) {
        this.setLessonId(newProps.lessonId);
        this.findAllTopicsForLesson(newProps.lessonId);
    }
    
    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }
    
    createTopic() {
        if (this.state.topic.title === '') {
            this.topicService
                .createTopic(this.state.lessonId, {
                    title: 'Default Template'
                })
                .then(() => this.findAllTopicsForLesson(this.state.lessonId));
        }
        else {
            this.topicService
                .createTopic(this.state.lessonId, this.state.topic)
                .then(() => this.findAllTopicsForLesson(this.state.lessonId));
        }
    }

    deleteTopic(topicId) {
        if (window.confirm("Do you want to delete this topic?")) {
            this.topicService
                .deleteLesson(topicId)
                .then(() => this.findAllTopicsForLesson(this.state.lessonId))
        }
    }

    setTopicTitle(event) {
        this.setState({
            topic: {
                title: event.target.value
            }
        });
    }


    findAllTopicsForLesson(lessonId) {
        this.topicService
            .findAllTopicsForLesson(lessonId)
            .then((topics) => {
                this.setState({topics: topics})
            });
    }

    renderListOfTopics() {
        let topics =
            this.state.topics.map((topic) => {
                return (<TopicPillItem key={topic.id}
                                       topic={topic}
                                       courseId={this.props.courseId}
                                       moduleId={this.props.moduleId}
                                       lessonId={this.state.moduleId}
                                       delete={this.deleteTopic}/>)
            });
        return topics;
    }


    render() {
        return (
            <div style={{width: '100%', height: '100%'}}>
                <nav className="navbar justify-content-between">
                    <form className="form-inline" style={{width: '100%'}}>
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

                <div className="container-fluid" style={{width: '100%', height: '100%'}}>
                    <ul className="nav nav-pills">
                        {this.renderListOfTopics()}
                    </ul>
                </div>

            </div>
        )
    }
}

export default TopicPills;