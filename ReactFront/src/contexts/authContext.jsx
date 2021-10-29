/* Libraries */
import React, { createContext, useState, useEffect, useContext } from "react";
/* API */
import * as auth from '../services/auth';
import api from '../services/api';
/* Context */
import { useLoading } from "./loadingContext";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [loginError, setLoginError] = useState('')
    const [registerError, setRegisterError] = useState('')
    const { showLoading, hideLoading } = useLoading()

    /* This hook verify if there is some user or token in localStorage and load the user in the APP */
    useEffect(() => {
        const storedUser = localStorage.getItem('Tasks:user')
        const storedToken = localStorage.getItem('Tasks:token')

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser))
            api.defaults.headers.Authorization = `Bearer ${storedToken}`
        }
    }, [])

    async function Login(values, history) {
        showLoading('Sending your data...') /* Show the loading screen with this message */
        const [hasErrors, response] = await auth.Login(values)
        hideLoading() /* Hide the loading screen */

        if (hasErrors) {
            return setLoginError(response)
        } else {
            setLoginError('') /* Clear any past error */
            api.defaults.headers.Authorization = `Bearer ${response.token}` /* Configure the token for others requests */
            localStorage.setItem('Tasks:user', JSON.stringify(response.user)); /* Store the user in local Storage */
            localStorage.setItem('Tasks:token', response.token) /* Store the token if needed, i'm not sure if does */
            /* The two following lines should be in that order */
            history.push('/') /* Change the URL to send the user to tasks dashboard */
            setUser(response.user) /* Authenticate the user */
        }
    }
    async function Register(values, history) {
        showLoading('Sending your data...') /* Show the loading screen with this message */
        const [hasErrors, response] = await auth.Register(values)
        hideLoading() /* Hide the loading screen after the request */

        if (hasErrors) {
            return setRegisterError(response)
        } else {
            setRegisterError('')
            api.defaults.headers.Authorization = `Bearer ${response.token}`
            localStorage.setItem('Tasks:user', JSON.stringify(response.user));
            localStorage.setItem('Tasks:token', response.token)
            history.push('/') /* Change the URL to send the user to tasks dashboard */
            setUser(response.user) /* Authenticate the user */
        }
    }
    async function Logout(history) {
        localStorage.clear()
        setUser()
        history.push('/')
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                Login,
                registerError,
                setRegisterError,
                Register,
                loginError,
                setLoginError,
                Logout,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) throw new Error('useAuth must be used within an Auth Provider')

    return context
}

export { AuthProvider, useAuth }