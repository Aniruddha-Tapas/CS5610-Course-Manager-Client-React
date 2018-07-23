const MODULE_CID_URL =
    'http://localhost:8080/api/course/CID/module';

const MODULE_URL = 'http://localhost:8080/api/module';

let _singleton = Symbol();
export default class ModuleService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ModuleService(_singleton);
        return this[_singleton]
    }

    createModule(courseId, module) {
        return fetch(MODULE_CID_URL.replace('CID', courseId), {
            body: JSON.stringify(module),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteModule(moduleId) {
        return fetch(MODULE_URL + '/' + moduleId, {
            method: 'DELETE'
        })
    }

    findAllModulesForCourse(courseId) {
        return fetch(
            MODULE_CID_URL
                .replace('CID', courseId))
            .then(function (response) {
                return response.text().then(function (text) {
                    return text ? JSON.parse(text) : []
                });
            })
    }

    findModuleById(moduleId) {
        return fetch(MODULE_URL + '/' + moduleId)
            .then(function (response) {
                return response.json();
            })
    }

    updateModule(moduleId, module) {
        return fetch(MODULE_URL + '/' + moduleId, {
            method: 'PUT',
            body: JSON.stringify(module),
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