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
        const storedToken = localStorage.getItem('Tasks:token')

        if (storedToken) LoadUser(storedToken)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function LoadUser(token) {
        showLoading('Loading user')
        api.defaults.headers.Authorization = `Bearer ${token}` /* Configure the token for the request */

        const [hasErrors, response] = await auth.LoadUser(token)
        if (hasErrors) {
            hideLoading('Loading user')
            setUser()
            localStorage.clear()
        }
        else {
            hideLoading('Loading user')
            setUser(response)
        }

    }

    async function Login(values, history) {
        showLoading('Sending your data...') /* Show the loading screen with this message */
        const [hasErrors, response] = await auth.Login(values)
        hideLoading() /* Hide the loading screen */

        if (hasErrors) {
            return setLoginError(response)
        } else {
            setLoginError('') /* Clear any past error */
            api.defaults.headers.Authorization = `Bearer ${response.token}` /* Configure the token for others requests */
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