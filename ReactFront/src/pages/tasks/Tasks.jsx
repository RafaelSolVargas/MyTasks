/* Libraries */
import React from "react";
import { useHistory } from "react-router";
/* Components */
import Task from './Task'
import Button from "../../components/Button";
/* Context */
import { useAuth } from "../../contexts/authContext";
import { useTasks } from "../../contexts/tasksContext";
/* CSS */
import '../../styles/Task.css'

// A div de Tasks renderiza uma Task para cada valor que veio de seu ancestral
const Tasks = () => {
    const { Logout } = useAuth()
    const { tasks, tasksLoaded } = useTasks()
    const history = useHistory()

    function handleLogout() {
        Logout(history)
    }

    return (
        <>
            {tasksLoaded ?
                <>
                    {tasks.map(eachTask =>
                        <Task
                            key={eachTask.id}
                            task={eachTask}
                        />)}
                    <div>
                        {<Button children='Logout' onClick={handleLogout} id='btn-logout'></Button>}
                    </div>
                </>
                :
                <>
                    {<Button children='Logout' onClick={handleLogout} id='btn-logout'></Button>}
                </>}
        </>

    )
}

export default Tasks;