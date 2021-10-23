/* Libraries */
import React from "react";
import { CgClose, CgInfo } from 'react-icons/cg'
/* Context */
import { useHistory } from "react-router-dom";
import { useTasks } from "../../contexts/tasksContext";
/* CSS */
import '../../styles/Task.css'

const Task = ({ task }) => {
    const history = useHistory()
    const { deleteTask, updateTaskStatus } = useTasks()

    const handleTaskDetailsClick = () => {
        history.push(`/tasks/${task.id}`)
    }
    return (
        <div className='task-container'
            style={task.completed ? { borderLeft: '6px solid chartreuse' } : {}}>
            <div className='task-title' onClick={() => updateTaskStatus(task)}>
                {task.title}
            </div>
            <div className='buttons-container'>
                <button
                    className='remove-task-button'
                    onClick={() => deleteTask(task.id)}
                >
                    <CgClose />
                </button>
                <button
                    className='see-task-details-button'
                    onClick={handleTaskDetailsClick}
                >
                    <CgInfo />
                </button>
            </div>
        </div>
    )
}

export default Task;