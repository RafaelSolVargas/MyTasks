import { React, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LoginForm from "./pages/login/Login";
import PageTasks from "./pages/tasks/pageTasks";
import PrivateRoute from "./components/privateRoute";
import TaskDetails from "./pages/taskDetails/taskDetails";

import './styles/App.css'

const userAdmin = {
    email: 'email@gmail.com',
    password: '12345'
}


// Cria duas rotas diferentes, uma aberta e outra privada, sendo que esta usa o componente personalizado que criamos
const Routes = () => {
    const [user, setUser] = useState({ email: '', userId: '' })
    const [error, setError] = useState('')
    const Login = (details) => {
        // Fazer fetch na API com email e senha, verificar o código e existência de token
        // Função para tentar fazer login com os dados recebidos do componente Login
        if (details.email !== userAdmin.email || details.password !== userAdmin.password) {
            setError('Email ou senha incorretos!')
        } else {
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