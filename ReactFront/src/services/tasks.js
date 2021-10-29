import api from './api'

export function CreateTask(values) {
    return new Promise((resolve, reject) => {
        api.post('/tasks', values).then((response, request) => {
            resolve([false, response.data])
        }).catch((err) => {
            if (err.response) { /* If got a response back with some error, means that the server received the request */
                if (err.response.data.ValidationErrors) { /* Check if we got some validation Error, in this case we send this to the component */
                    resolve([true, err.response.data.ValidationErrors[0].msg])
                } else { /* If not, we send the status Text until we know another type of return */
                    resolve([true, err.response.statusText])
                }
            } else if (err.request) { /* If we got here, we never received the response from the server or the request never left */
                resolve([true, 'Our server is currently offline'])
            } else {
                resolve([true, 'Unknown Error'])
            }
        })
    })
}

export function LoadTasks() {
    return new Promise((resolve, reject) => {
        api.get('/tasks').then((response) => {
            resolve([false, response.data])
        }).catch((err) => {
            if (err.response) { /* If got a response back with some error, means that the server received the request */
                resolve([true, err.response.statusText])
            } else if (err.request) { /* If we got here, we never received the response from the server or the request never left */
                resolve([true, 'Our server is currently offline'])
            } else {
                resolve([true, 'Unknown Error'])
            }
        })
    })
}

export function UpdateTask(values, taskId) {
    return new Promise((resolve, reject) => {
        api.put(`/tasks/${taskId}`, values).then((response, request) => {
            resolve([false, response.data])
        }).catch((err) => {
            if (err.response) { /* If got a response back with some error, means that the server received the request */
                if (err.response.data.ValidationErrors) { /* Check if we got some validation Error, in this case we send this to the component */
                    resolve([true, err.response.data.ValidationErrors[0].msg])
                } else { /* If not, we send the status Text until we know another type of return */
                    resolve([true, err.response.statusText])
                }
            } else if (err.request) { /* If we got here, we never received the response from the server or the request never left */
                resolve([true, 'Our server is currently offline'])
            } else {
                resolve([true, 'Unknown Error'])
            }
        })
    })
}

export function DeleteTask(taskId) {
    return new Promise((resolve, reject) => {
        api.delete(`/tasks/${taskId}`).then((response, request) => {
            resolve([false, response.data])
        }).catch((err) => {
            if (err.response) { /* If got a response back with some error, means that the server received the request */
                if (err.response.data.ValidationErrors) { /* Check if we got some validation Error, in this case we send this to the component */
                    resolve([true, err.response.data.ValidationErrors[0].msg])
                } else { /* If not, we send the status Text until we know another type of return */
                    resolve([true, err.response.statusText])
                }
            } else if (err.request) { /* If we got here, we never received the response from the server or the request never left */
                resolve([true, 'Our server is currently offline'])
            } else {
                resolve([true, 'Unknown Error'])
            }
        })
    })
}

