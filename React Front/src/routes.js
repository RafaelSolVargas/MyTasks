import { React, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";

import LoginForm from "./pages/login/Login";
import PageTasks from "./pages/tasks/pageTasks";
import PrivateRoute from "./components/privateRoute";
import TaskDetails from "./pages/taskDetails/taskDetails";

import './styles/App.css'

// Cria duas rotas diferentes, uma aberta e outra privada, sendo que esta usa o componente personalizado que criamos
const Routes = () => {
    const [user, setUser] = useState({ email: '', userId: '' })
    const [error, setError] = useState('')
    const Login = async (details) => {
        const response = await axios.post('url', details)
        if (response.status !== 200) {
            setError('Email ou senha incorretos!')
        } else {
            localStorage.setItem('token', response.data.token)
            setUser({ email: details.email })
            setError('')
        }
    }
    const Logout = () => {
        setUser({ email: '', userId: '' })
    }

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={() => <LoginForm Login={Login} error={error} />} />
                    <PrivateRoute path="/tasks" component={() => <PageTasks user={user} Logout={Logout} />} />
                    <Route exact path="/:taskTitle" component={TaskDetails}
                    />
                </Switch>
            </BrowserRouter>
        </div>
    )
};

export default Routes;