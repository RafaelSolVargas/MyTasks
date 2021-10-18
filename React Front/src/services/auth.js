import api from './api'

export function Register(values) {
    return new Promise((resolve, reject) => {
        api.post('/auth', values).then((response, request) => {
            resolve([false, response.data])
        }).catch((err) => {
            console.log(err.response)
            console.log(err.request)
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

export function Login(values) {
    return new Promise((resolve, reject) => {
        api.post('/auth/login', values).then((response) => {
            resolve([false, response.data])
        }).catch((err) => {
            if (err.response) { /* If got a response back with some error, means that the server received the request */
                if (err.response.statusText === 'Unauthorized') {
                    resolve([true, 'Wrong password or email'])
                }
                else {
                    resolve([true, 'Some validation error'])
                }
            } else if (err.request) { /* If we got here, we never received the response from the server or the request never left */
                resolve([true, 'Our server is currently offline'])
            } else {
                resolve([true, 'Unknown Error'])
            }
        })
    })

}