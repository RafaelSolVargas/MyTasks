/* Libraries */
import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AiFillEdit } from 'react-icons/ai'
import { GiCheckMark } from 'react-icons/gi'

/* Components */
import Button from '../../components/Button'
/* Context */
import { useTasks } from "../../contexts/tasksContext";
import { useLoading } from "../../contexts/loadingContext";
/* CSS */
import '../../styles/TaskDetails.css'
import '../../styles/App.css'

const TaskDetails = () => {
    const [task, setTask] = useState({
        id: '',
        title: '',
        description: '',
        dateRegistration: '',
        completed: false
    })
    /* Configure the useRef to always have the current task value, in that way we could verify if the task has been loaded
    some time after the component loaded, and then we decide if we show some error screen to user */
    const taskRef = useRef(task)
    taskRef.current = task
    const [taskLoaded, setTaskLoaded] = useState(true)
    const { taskId } = useParams();
    const history = useHistory()

    const { getTask, tasks, updateTask } = useTasks()
    const { hideLoading, showLoading } = useLoading()

    const handleBackButtonClick = () => {
        /* Uses the history context to get the user back to where he was */
        history.goBack()
    }

    const handleEditClick = () => {
        let title = document.getElementById('title-input');
        title.value = taskRef.current.title;
        let description = document.getElementById('description-input');
        description.value = taskRef.current.description;

        document.getElementById('edit-button').style.display = 'none';
        document.getElementById('apply-button').style.display = 'flex';
        document.getElementById('title-label').style.display = 'none';
        document.getElementById('title-input').style.display = 'flex';
        document.getElementById('description-input').style.display = 'flex'
        document.getElementById('description-label').style.display = 'none'

        document.getElementById('completed-span').style.cursor = 'pointer'
        document.getElementById('completed-span').onclick = handleCompletedClick
    }
    const handleApplyClick = () => {
        /* Take the new values to this task */
        const titleInput = document.getElementById('title-input').value
        const descriptionInput = document.getElementById('description-input').value
        const completedInput = document.getElementById('completed-span').innerText === 'Completed' ? true : false

        /* Create a object rewriting the title, description and completed */
        const newTask = { ...task, title: titleInput, description: descriptionInput, completed: completedInput }
        setTask(newTask) /* Set the task in this component */
        updateTask(newTask, task.id) /* Send a update of the task to the update */

        document.getElementById('apply-button').style.display = 'none';
        document.getElementById('edit-button').style.display = 'flex';
        document.getElementById('title-label').style.display = 'flex';
        document.getElementById('title-input').style.display = 'none';
        document.getElementById('description-input').style.display = 'none'
        document.getElementById('description-label').style.display = 'flex'
        /* Changes the pointer and function of completed span */
        document.getElementById('completed-span').style.cursor = 'pointer'
        document.getElementById('completed-span').onclick = () => { }
    }
    const handleCompletedClick = () => {
        setTask({ ...task, completed: !taskRef.current.completed })
    }

    useEffect(() => {
        /* This Hook load the task from the Context, this may be triggered multiple times until the Context Fetch the Tasks, for this purpose
        the array of dependency have the tasks variable, we try to get the current task from the tasks using the taskId, when we got something back
        we hide the loading screen. The other dependency are not in the array because their change does not impact in the purpose of this function  */
        showLoading('Loading Task Detail', true)

        const incomingTask = (getTask(taskId)[0])

        /* This will verify if the task has loaded in 3seg after the component mounted */
        setTimeout(() => {
            if (taskRef.current.id === '')
                setTaskLoaded(false)
            hideLoading('Loading Task Detail')
        }, 2000)

        if (incomingTask) {

            setTask(incomingTask)
            setTaskLoaded(true)
            hideLoading('Loading Task Detail')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasks])

    return (
        <div>
            {taskLoaded ?
                <div className='container'>
                    <div
                        className='back-button-container'
                        onClick={handleBackButtonClick}
                    >
                        <Button>Voltar</Button>
                    </div>
                    <div className='task-details-container'>
                        <div className='title-button'>
                            <h2 id='title-label'>{task.title && task.title}</h2>
                            <input id='title-input' style={{ display: 'none' }}></input>
                            <div className='edit-button-container'>
                                <AiFillEdit className='edit-button' id='edit-button' size={20} onClick={handleEditClick}></AiFillEdit>
                                <GiCheckMark className='apply-button' id='apply-button' style={{ display: 'none' }} size={20} onClick={handleApplyClick}></GiCheckMark>
                            </div>
                        </div>
                        <p id='description-label'>
                            {task.description}
                        </p>
                        <textarea id='description-input' style={{ display: 'none' }}></textarea>
                        <span
                            id='completed-span'
                            className={task.completed ? 'completed-task' : 'not-completed-task'}
                        >{task.completed ? 'Completed' : 'Not completed'}</span>
                        <hr className='linha'></hr>
                        <span className='date-registration'>{task.dateRegistration}</span>
                    </div>
                </div>
                :
                <div className='container'>
                    <div
                        className='back-button-container'
                        onClick={handleBackButtonClick}
                    >
                        <Button>Voltar</Button>
                    </div>
                    <div className='task-details-container'>
                        <p>Task does not exists</p>
                    </div>
                </div>
            }
        </div>
    );
}

export default TaskDetails;