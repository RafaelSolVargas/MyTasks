import React, { createContext, useState, useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom'
/* API */
import { CreateTask, LoadTasks, UpdateTask, DeleteTask } from "../services/tasks";
/* Context */
import { useAuth } from "./authContext";
import { useLoading } from "./loadingContext";

const tasksContext = createContext();

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([{}])
    const [taskError, setTaskError] = useState('')
    const [tasksLoaded, setTasksLoaded] = useState(false)
    const { showLoading, hideLoading } = useLoading()
    const { Logout } = useAuth()
    const history = useHistory()

    /* Hook to load tasks from API in loading page */
    useEffect(() => {
        /* I disabled the ESLint plugin because i'm sure that this asynchronous function should run just one time, when the component mount */
        loadTasks()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getTask(taskId) {
        const task = tasks.filter((eachTask) => String(eachTask.id) === taskId)

        return task
    }

    async function loadTasks() {
        /* Inicialize the loading page while we load their tasks */
        showLoading('Loading your tasks')
        const [hasErrors, response] = await LoadTasks() /* Make a request in API for tasks */
        if (hasErrors) {
            hideLoading('Loading your tasks')

            if (response === 'Unauthorized') {
                /* Show a loading screen telling the user that he must login again */
                showLoading('You need to authenticate again, redirecting you to login page...')
                setTimeout(() => {
                    hideLoading('You need to authenticate again, redirecting you to login page...')
                }, 2000)
                /* If this happens, that means that the backEnd doesn't accept the token of this users, and then we will force him
                to login again */
                Logout(history)
            }
            else setTaskError(response)
        }
        else {
            for (let i = 0; i < response.length; i++) {
                response[i].dateRegistration = new Date(response[i].dateRegistration).toLocaleString()
            }

            setTasks(response) /* We set the tasks */
            setTasksLoaded(true) /* And tell the APP that tasks are available */
            hideLoading('Loading your tasks')
        }
    }

    /* Send the values to create a new Task in DB */
    async function createTask(values) {
        const [hasErrors, response] = await CreateTask(values)
        /* If there is some error we set him to Component show to User */
        if (hasErrors) {
            hideLoading('Loading your tasks')

            if (response === 'Unauthorized') {
                /* Show a loading screen telling the user that he must login again */
                showLoading('You need to authenticate again, redirecting you to login page...')
                setTimeout(() => {
                    hideLoading('You need to authenticate again, redirecting you to login page...')
                }, 2000)
                /* If this happens, that means that the backEnd doesn't accept the token of this users, and then we will force him
                to login again */
                Logout(history)
            }
            else setTaskError(response)
        }
        /* If not we add the new task returned by de DB to tasks list */
        else {
            const newTasks = [
                ...tasks,
                {
                    id: response.task.id,
                    title: response.task.title,
                    completed: response.task.completed,
                    description: response.task.description,
                    dateRegistration: new Date(response.task.dateRegistration).toLocaleString(),
                }
            ]

            setTasks(newTasks)
        }
    }

    async function updateTask(values, taskId) {
        showLoading('Updating your task')
        const [hasErrors, response] = await UpdateTask(values, taskId)
        if (hasErrors) {
            hideLoading('Loading your tasks')

            if (response === 'Unauthorized') {
                /* Show a loading screen telling the user that he must login again */
                showLoading('You need to authenticate again, redirecting you to login page...')
                setTimeout(() => {
                    hideLoading('You need to authenticate again, redirecting you to login page...')
                }, 2000)
                /* If this happens, that means that the backEnd doesn't accept the token of this users, and then we will force him
                to login again */
                Logout(history)
            }
            else setTaskError(response)
        }
        else {
            hideLoading('Updating your task')
            /* If the update tasks request was successful we change the App tasks state */
            const newTasks = tasks.map(task => {
                if (task.id === taskId) {
                    task = values
                    return task
                }
                return task
            })
            setTasks(newTasks)
        }
    }

    async function updateTaskStatus(task) {
        task.completed = !task.completed
        const [hasErrors, response] = await UpdateTask(task, task.id)
        if (hasErrors) {
            hideLoading('Loading your tasks')

            if (response === 'Unauthorized') {
                /* Show a loading screen telling the user that he must login again */
                showLoading('You need to authenticate again, redirecting you to login page...')
                setTimeout(() => {
                    hideLoading('You need to authenticate again, redirecting you to login page...')
                }, 2000)
                /* If this happens, that means that the backEnd doesn't accept the token of this users, and then we will force him
                to login again */
                Logout(history)
            }
            else setTaskError(response)
        }
        else {
            /* If the update tasks request was successful we change the App tasks state */
            const newTasks = tasks.map(oldTask => {
                if (oldTask.id === task.id) {
                    oldTask = task
                    return task
                }
                return oldTask
            })
            setTasks(newTasks)
        }
    }

    async function deleteTask(taskId) {
        const [hasErrors, response] = await DeleteTask(taskId)
        if (hasErrors) {
            hideLoading('Loading your tasks')

            if (response === 'Unauthorized') {
                /* Show a loading screen telling the user that he must login again */
                showLoading('You need to authenticate again, redirecting you to login page...')
                setTimeout(() => {
                    hideLoading('You need to authenticate again, redirecting you to login page...')
                }, 2000)
                /* If this happens, that means that the backEnd doesn't accept the token of this users, and then we will force him
                to login again */
                Logout(history)
            }
            else setTaskError(response)
        }
        else {
            /* If the deleted request was successfully, we change the App tasks state */
            const newTasks = tasks.filter((task) => task.id !== taskId)
            setTasks(newTasks)
        }
    }


    return (
        <tasksContext.Provider
            value={{
                getTask,
                tasks,
                setTasks,
                createTask,
                taskError,
                setTaskError,
                tasksLoaded,
                updateTask,
                deleteTask,
                updateTaskStatus
            }}>
            {children}
        </tasksContext.Provider>
    )
}

function useTasks() {
    const context = useContext(tasksContext);

    if (!context) throw new Error('useTasks must be used within an Tasks Provider')

    return context
}

export { TaskProvider, useTasks }