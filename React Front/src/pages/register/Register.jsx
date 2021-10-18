/* Libraries */
import { React, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
/* Components */
import Button from "../../components/Button";
import validateRegister from './registerValidate'
/* Context */
import { useAuth } from "../../contexts/authContext";
/* CSS */
import './Register.css'

const RegisterForm = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    })
    const { Register, registerError, setRegisterError } = useAuth();
    const history = useHistory()

    useEffect(() => {
        console.log('Componente Registro Renderizado')
    }, [])

    const handleRegisterChange = e => setValues({ ...values, [e.target.name]: e.target.value })
    const handleLoginClick = e => {
        setRegisterError('') // Remove any error that came from the principal Router
        history.push('/login') // And sends the users to slash login
    }
    const handleSubmit = e => {
        e.preventDefault(); // Forbidden the page to reload
        const [hasErrors, errorsFound] = validateRegister(values);
        setErrors(errorsFound)
        if (!hasErrors) Register(values)
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
    const handleSeeConfirmPasswordClick = e => {
        e.preventDefault();
        if (document.getElementById('confirm-password').type === 'password') {
            document.getElementById('confirm-password').type = 'text'
            document.getElementById('hide-confirm-password').style.display = 'none';
            document.getElementById('show-confirm-password').style.display = 'flex';

        } else {
            document.getElementById('confirm-password').type = 'password'
            document.getElementById('show-confirm-password').style.display = 'none';
            document.getElementById('hide-confirm-password').style.display = 'flex';
        }
    }

    return (
        <>
            <form>
                <div className='container-register'>
                    <h2>Register</h2>
                    <div className='form-group'>
                        <label htmlFor='username'>Username: </label>
                        <div className='inner-input'>
                            <input type='text' name='name' id='name' onChange={handleRegisterChange} placeholder='Choose a Username' />
                        </div>
                        {errors.username && <span className='validation-errors'>{errors.username}</span>}

                    </div>
                    <div className='form-group'>
                        <label htmlFor='name'>Email: </label>
                        <div className='inner-input'>
                            <input type='text' name='email' id='email' onChange={handleRegisterChange} placeholder='Choose a email' />
                        </div>
                        {errors.email && <span className='validation-errors'>{errors.email}</span>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password: </label>
                        <div className='inner-input'>
                            <input type='password' name='password' id='password' onChange={handleRegisterChange} placeholder='8-16 | Capital, Tiny, Special, Numbers' />
                            <AiFillEye className='see-btn' style={{ display: 'none' }} id='show-password' onClick={handleSeePasswordClick} />
                            <AiFillEyeInvisible className='see-btn' id='hide-password' onClick={handleSeePasswordClick} />
                        </div>
                        {errors.password && <span className='validation-errors'>{errors.password}</span>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='confirmPassword'>Confirm The Password: </label>
                        <div className='inner-input'>
                            <input type='password' name='confirmPassword' id='confirm-password' onChange={handleRegisterChange} placeholder='Repeat the password' />
                            <AiFillEye className='see-btn' style={{ display: 'none' }} id='show-confirm-password' onClick={handleSeeConfirmPasswordClick} />
                            <AiFillEyeInvisible className='see-btn' id='hide-confirm-password' onClick={handleSeeConfirmPasswordClick} />
                        </div>
                        {errors.confirmPassword && <span className='validation-errors'>{errors.confirmPassword}</span>}
                    </div>
                    {(registerError !== '') ? (<div className='app-error'>{registerError}</div>) : ''}
                    <Button className='btn-register-register' id='btn-register-register' children='Register' onClick={handleSubmit}></Button>
                    <div className='questions-labels-register'>
                        <label>Already has an account?</label>
                    </div>
                    <div className='questions-buttons-register'>
                        <Button type='button' className='btn-login-register' id='btn-login-register' children='Login' onClick={handleLoginClick}></Button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default RegisterForm;