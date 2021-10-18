/* Libraries */
import React, { useState } from "react";
/* Components */
import Button from '../../components/Button'
/* CSS */
import '../../styles/AddTask.css'


const AddTask = ({ handleTaskAddition }) => {
    const [inputData, setInputData] = useState('')

    const handleInputChange = e => setInputData(e.target.value)
    const handleAddTaskClick = () => {
        if (inputData === '') return
        handleTaskAddition(inputData)
        setInputData('')
    }

    return (
        <div className="add-task-container">
            <input
                onChange={handleInputChange}
                value={inputData}
                className="add-task-input"
                type="text"
                placeholder='Put some task here to save'
            />

            <div className="add-task-button-container">
                <Button onClick={handleAddTaskClick}>Add your Task</Button>
            </div>
        </div>
    );
}

export default AddTask;