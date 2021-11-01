/* Libraries */
import React, { useState } from "react";
/* Components */
import Button from '../../components/Button'
import { useTasks } from "../../contexts/tasksContext";
/* CSS */
import '../../styles/AddTask.css'


const AddTask = () => {
    const [values, setValues] = useState({
        title: '',
        description: ''
    })
    const { createTask, taskError, setTaskError } = useTasks();

    const handleInputChange = e => setValues({ ...values, [e.target.name]: e.target.value })
    const handleAddTaskClick = () => {
        setTaskError('')
        setValues({ title: '', description: '' })
        createTask(values)
    }

    return (
        <div className='add-task-container'>
            <div className="title-btn-container">
                <input
                    onChange={handleInputChange}
                    value={values.title}
                    className="title-input"
                    name='title'
                    type="text"
                    placeholder='Put some task here to save'
                />
                <Button onClick={handleAddTaskClick} id='add-task-button'>Save</Button>
            </div>
            <div className='description-container'>
                <textarea
                    name='description'
                    className='description-input'
                    value={values.description}
                    type='text'
                    placeholder='Put the description of your task here'
                    onChange={handleInputChange}
                ></textarea>
            </div>
            {(taskError !== '') ? (<div className='error'>{taskError}</div>) : ''}
        </div>
    );
}

export default AddTask;