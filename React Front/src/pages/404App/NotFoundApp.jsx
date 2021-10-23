/* Libraries */
import { React } from "react";
import { useHistory } from 'react-router-dom'
/* Components */
import Button from "../../components/Button";
/* CSS */
import './NotFoundApp.css'

const NotFoundApp = () => {
    const history = useHistory()

    const handleTasksClick = e => {
        history.push('/tasks') // Sends the users to slash login
    }

    return (
        <>
            <form>
                <div className='container-not-found'>
                    <h2>Page not Found</h2>
                    <div className='questions-labels-not-found'>
                        <label>Click here to see your tasks</label>
                    </div>
                    <div className='questions-buttons-not-found'>
                        <Button type='button' className='btn-tasks-not-found' id='btn-tasks-not-found' children='Your Tasks' onClick={handleTasksClick}></Button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default NotFoundApp;