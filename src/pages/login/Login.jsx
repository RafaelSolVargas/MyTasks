import { React, useState } from "react";
import Button from "../../components/Button";
import '../../styles/Login.css'



const LoginForm = ({ Login, error }) => {
    const [details, setDetails] = useState({ email: '', password: '' })

    const handleSubmit = (e) => {
        e.preventDefault();
        Login(details)
    }
    const handleEmailChange = e => setDetails({ ...details, email: e.target.value })
    const handlePasswordChange = e => setDetails({ ...details, password: e.target.value })

    return (
        <form>
            <div className='form-inner'>
                <h2>Login</h2>
                <div className='form-group'>
                    <label htmlFor='name'>Email: </label>
                    <input type='text' name='email' id='emailLogin' onChange={handleEmailChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password: </label>
                    <input type='text' name='password' id='passwordLogin' onChange={handlePasswordChange} />
                </div>
                {(error !== '') ? (<div className='error'>{error}</div>) : ''}
                <Button className='buttonLogin' id='buttonLogin' children='Login' onClick={handleSubmit}></Button>
                <div className='questionsLabel'>
                    <label>Not registered?</label>
                    <label>Forgot your password?</label>
                </div>
                <div className='questionsButtons'>
                    <Button className='buttonRegister' id='buttonRegister' children='Register'></Button>
                    <Button className='buttonForgot' id='buttonForgot' children='Reset Password'></Button>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;