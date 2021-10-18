/* Libraries */
import React from "react";
/* Components */
import Task from './Task'
import Button from "../../components/Button";
/* Context */
import { useAuth } from "../../contexts/authContext";

// A div de Tasks renderiza uma Task para cada valor que veio de seu ancestral
const Tasks = ({ tasks, handleTaskClick, handleTaskDelete }) => {
    const { Logout } = useAuth()

    return (
        <>
            {tasks.map(task =>
                <Task
                    key={task.id}
                    task={task}
                    handleTaskClick={handleTaskClick}
                    handleTaskDelete={handleTaskDelete} />)}
            <div>
                {<Button children='Logout' onClick={Logout}></Button>}
            </div>
        </>

    )
}

export default Tasks;