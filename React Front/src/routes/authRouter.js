import { React, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Loading from "../components/Loading";
import LoginForm from "../pages/login/Login";
import RegisterForm from "../pages/register/Register";

import '../styles/App.css'

// Cria duas rotas diferentes, uma aberta e outra privada, sendo que esta usa o componente personalizado que criamos
const AuthRouter = () => {
    console.log('Entrei no AuthRouter')
    const [error, setError] = useState('')
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" component={() => <LoginForm appError={error} setAppError={setError} />} />
                    <Route exact path='/register' component={() => <RegisterForm appError={error} setAppError={setError} />} />
                    <Route exact path='/forgot' component={
                        () => {
                            (
                                <>
                                    <Loading loading={true} message='aoba' />
                                    <RegisterForm appError={error} setAppError={setError} />
                                </>
                            )
                        }
                    } />
                    <Route exact path='/loading' component={() => <Loading />} />
                </Switch>
            </BrowserRouter>
        </div>
    )
};

export default AuthRouter;
/*

 */
