/* Libraries */
import { React } from "react";
import { useHistory } from 'react-router-dom'
/* Components */
import Button from "../../components/Button";
/* CSS */
import './NotFoundAuth.css'

const NotFoundAuth = () => {
    const history = useHistory()

    const handleLoginClick = e => {
        history.push('/') // Sends the users to start screen to login
    }

    return (
        <>
            <form>
                <div className='container-not-found'>
                    <h2>Page not Found</h2>
                    <div className='questions-labels-not-found'>
                        <label>You are not logged, click here to login</label>
                    </div>
                    <div className='questions-buttons-not-found'>
                        <Button type='button' className='btn-tasks-not-found' id='btn-tasks-not-found' children='Login' onClick={handleLoginClick}></Button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default NotFoundAuth;