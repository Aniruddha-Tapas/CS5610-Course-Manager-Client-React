const LESSON_CID_MID_URL =
    'http://localhost:8080/api/course/CID/module/MID/lesson';

const LESSON_MID_URL =
    'http://localhost:8080/api/module/MID/lesson';

const LESSON_URL = 'http://localhost:8080/api/lesson';

let _singleton = Symbol();
export default class LessonService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton]
    }

    createLesson(courseId, moduleId, lesson) {
        return fetch(
            LESSON_CID_MID_URL
                .replace('CID', courseId)
                .replace('MID', moduleId), {
                body: JSON.stringify(lesson),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        })
    }

    deleteLesson(lessonId) {
        return fetch(LESSON_URL + '/' + lessonId, {
            method: 'DELETE'
        })
    }

    findAllLessonsForModule(courseId, moduleId) {
        return fetch(
            LESSON_CID_MID_URL
                .replace('CID', courseId)
                .replace('MID', moduleId))
            .then(function (response) {
                return response.text().then(function (text) {
                    return text ? JSON.parse(text) : []
                });
            })
    }

    findLessonById(lessonId) {
        return fetch(LESSON_URL + '/' + lessonId)
            .then(function (response) {
                return response.json();
            })
    }

    updateLesson(lessonId, lesson) {
        return fetch(LESSON_URL + '/' + lessonId, {
            method: 'put',
            body: JSON.stringify(lesson),
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