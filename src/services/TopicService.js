const TOPIC_CID_MID_LID_URL =
    'https://cs5610-whiteboard-server-java.herokuapp.com/api/course/CID/module/MID/lesson/LID/topic';

const TOPIC_URL = 'https://cs5610-whiteboard-server-java.herokuapp.com/api/topic';

let _singleton = Symbol();
export default class TopicService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TopicService(_singleton);
        return this[_singleton]
    }

    createTopic(courseId, moduleId, lessonId, topic) {
        return fetch(
            TOPIC_CID_MID_LID_URL
                .replace('CID', courseId)
                .replace('MID', moduleId)
                .replace('LID', lessonId), {
            body: JSON.stringify(topic),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteTopic(topicId) {
        return fetch(TOPIC_URL + '/' + topicId, {
            method: 'DELETE'
        })
    }

    findAllTopicsForLesson(courseId, moduleId, lessonId) {
        return fetch(
            TOPIC_CID_MID_LID_URL
                .replace('CID', courseId)
                .replace('MID', moduleId)
                .replace('LID', lessonId))
            .then(function (response) {
                return response.text().then(function (text) {
                    return text ? JSON.parse(text) : []
                });
            })
    }

    findTopicById(topicId) {
        return fetch(TOPIC_URL + '/' + topicId)
            .then(function (response) {
                return response.json();
            })
    }

    updateTopic(topicId, topic) {
        return fetch(TOPIC_URL + '/' + topicId, {
            method: 'put',
            body: JSON.stringify(topic),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function (response) {
            if (response.bodyUsed) {
                return response.json();
            } else {
                return null;
            }
        });
    }
}
