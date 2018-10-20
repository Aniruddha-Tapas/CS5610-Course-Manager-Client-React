let _singleton = Symbol();
const COURSE_API_URL =
    'https://cs5610-whiteboard-server-java.herokuapp.com/api/course';

class CourseService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new CourseService(_singleton);
        return this[_singleton]
    }

    createCourse(course) {
        return fetch(COURSE_API_URL, {
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteCourse(courseId) {
        return fetch(COURSE_API_URL + "/" + courseId, {
            method: 'DELETE'
        })
    }

    findAllCourses() {
        return fetch(COURSE_API_URL)
            .then(function (response) {
                return response.json();
            });
    }

    findCourseById(courseId) {
        return fetch(COURSE_API_URL + "/" + courseId)
            .then(function (response) {
                return response.json();
            })
    }


    updateCourse(courseId, course) {
        return fetch(COURSE_API_URL + "/" + courseId, {
            method: 'PUT',
            body: JSON.stringify(course),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response){
            if(response.bodyUsed) {
                return response.json();
            } else {
                return null;
            }
        });
    }

}

export default CourseService;
