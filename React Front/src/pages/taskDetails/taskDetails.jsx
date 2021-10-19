/* Libraries */
import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
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
        title: '',
        description: '',
        id: '',
        date: '',
        completed: false
    })
    /* Configure the useRef to always have the current task value, in that way we could verify if the task has been loaded
    some time after the component loaded, and then we decide if we show some error screen to user */
    const taskRef = useRef(task)
    taskRef.current = task
    const [taskLoaded, setTaskLoaded] = useState(true)
    const { taskId } = useParams();
    const history = useHistory()

    const { getTask, tasks } = useTasks()
    const { hideLoading, showLoading } = useLoading()

    /* const [ count, setCount ] = useState(0)
    const countRef = useRef(count) */

    const handleBackButtonClick = () => {
        /* Uses the history context to get the user back to where he was */
        history.goBack()
    }

    useEffect(() => {
        /* This Hook load the task from the Context, this may be triggered multiple times until the Context Fetch the Tasks, for this purpose
        the array of dependency have the tasks variable, we try to get the current task from the tasks using the taskId, when we got something back
        we hide the loading screen. The other dependency are not in the array because their change does not impact in the purpose of this function  */
        showLoading('Loading Task Detail')
        const incomingTask = (getTask(taskId)[0])

        /* This will verify if the task has loaded in 3seg after the component mounted */
        setTimeout(() => {
            if (taskRef.current.id === '')
                setTaskLoaded(false)
            hideLoading()
        }, 3500)

        if (incomingTask) {
            setTask(incomingTask)
            setTaskLoaded(true)
            hideLoading()
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
                        <h2>{task.title && task.title}</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis consequatur consectetur nihil quae laboriosam
                            modi, omnis eos dolore perferendis reiciendis.
                        </p>
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