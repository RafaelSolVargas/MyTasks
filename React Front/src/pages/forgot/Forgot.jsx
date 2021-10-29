/* Libraries */
import { React, useState } from "react";
import { useHistory } from 'react-router-dom'
/* Components */
import Button from "../../components/Button";
/* CSS */
import './Forgot.css'

const ForgotForm = () => {
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState('')
    const history = useHistory()

    const handleSubmit = e => {
        e.preventDefault(); // Forbidden the page to reload
        // check if email exists
        setErrors('')
    }
    const handleLoginClick = e => {
        history.push('/') // Sends the users to login screen
    }
    const handleEmailChange = e => setEmail(e.target.value)


    return (
        <>
            <form>
                <div className='container-forgot'>
                    <h2>Forgot Password</h2>
                    <div className='form-group'>
                        <span className='message-implemented'>This feature is not implemented yet</span>
                        <label htmlFor='email'>Your Email: </label>
                        <div className='inner-input'>
                            <input type='email' name='email' value={email} id='email' onChange={handleEmailChange} placeholder='Your email' />
                        </div>
                        {errors && <span className='validation-errors'>{errors}</span>}

                    </div>
                    <Button className='btn-send-forgot' id='btn-send-forgot' children='Send Email' onClick={handleSubmit}></Button>
                    <div className='questions-labels-forgot'>
                        <label>Already has an account?</label>
                    </div>
                    <div className='questions-buttons-forgot'>
                        <Button type='button' className='btn-login-forgot' id='btn-login-forgot' children='Login' onClick={handleLoginClick}></Button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default ForgotForm;