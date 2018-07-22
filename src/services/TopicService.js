const TOPIC_LID_URL =
    'http://localhost:8080/api/lesson/LID/topic';

const TOPIC_URL = 'http://localhost:8080/api/topic';

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

    createTopic(lessonId, topic) {
        return fetch(TOPIC_LID_URL.replace('LID', lessonId), {
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

    findAllTopicsForLesson(lessonId) {
        return fetch(
            TOPIC_LID_URL
                .replace('LID', lessonId))
            .then(function (response) {
                return response.json();
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