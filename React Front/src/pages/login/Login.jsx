/* Libraries */
import { React, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
/* Components */
import Button from "../../components/Button";
import loginValidate from "./loginValidate";
/* Context */
import { useAuth } from "../../contexts/authContext";
/* CSS */
import './Login.css'

const LoginForm = () => {
    const [values, setValues] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({ email: '', password: '' })
    const { Login, loginError, setLoginError } = useAuth()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        const [hasErrors, errorsFound] = loginValidate(values)
        setErrors(errorsFound)

        if (!hasErrors) Login(values, history)
    }
    const handleRegisterClick = e => {
        setLoginError('') // Remove any App error and change to register
        history.push('/register')
    }
    const handleForgotClick = e => {
        setLoginError('')
        history.push('/forgot')
    }
    const handleSeePasswordClick = e => {
        e.preventDefault();
        if (document.getElementById('password').type === 'password') {
            document.getElementById('password').type = 'text'
            document.getElementById('hide-password').style.display = 'none';
            document.getElementById('show-password').style.display = 'flex';

        } else {
            document.getElementById('password').type = 'password'
            document.getElementById('show-password').style.display = 'none';
            document.getElementById('hide-password').style.display = 'flex';
        }
    }
    const handleLoginChange = e => setValues({ ...values, [e.target.name]: e.target.value })

    useEffect(() => {
        console.log('Componente Login Renderizado')
    }, [])

    return (
        <form>
            <div className='container-login'>
                <h2>Login</h2>
                <div className='form-group'>
                    <label htmlFor='email'>Email: </label>
                    <div className='inner-input'>
                        <input type='email' name='email' id='email' onChange={handleLoginChange} placeholder='Your email' />
                    </div>
                    {errors.email && <span className='validation-errors'>{errors.email}</span>}
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password: </label>
                    <div className='inner-input'>
                        <input type='password' name='password' id='password' onChange={handleLoginChange} placeholder='Your password' />
                        <AiFillEye className='see-btn' style={{ display: 'none' }} id='show-password' onClick={handleSeePasswordClick} />
                        <AiFillEyeInvisible className='see-btn' id='hide-password' onClick={handleSeePasswordClick} />
                    </div>
                    {errors.password && <span className='validation-errors'>{errors.password}</span>}
                </div>
                {(loginError !== '') ? (<div className='error'>{loginError}</div>) : ''}
                <Button className='buttonLogin' id='btn-login-login' children='Login' onClick={handleSubmit}></Button>
                <div className='questions-labels-login'>
                    <label>Not registered?</label>
                    <label>Forgot your password?</label>
                </div>
                <div className='questions-buttons-login'>
                    <Button className='btn-register-login' id='btn-register-login' children='Register' onClick={handleRegisterClick}></Button>
                    <Button className='btn-forgot-login' id='btn-forgot-login' children='Reset Password' onClick={handleForgotClick}></Button>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;