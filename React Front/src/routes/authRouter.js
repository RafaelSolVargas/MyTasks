/* Libraries */
import { React, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
/* Components */
import LoginForm from "../pages/login/Login";
import RegisterForm from "../pages/register/Register";
/* CSS */
import '../styles/App.css'

// Create different routes for each URL that includes the authentication context 
const AuthRouter = () => {
    console.log('Entrei no AuthRouter')
    const [error, setError] = useState('')
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" component={() => <LoginForm appError={error} setAppError={setError} />} />
                    <Route exact path='/register' component={() => <RegisterForm appError={error} setAppError={setError} />} />
                    <Route exact path='/forgot' component={() => <RegisterForm appError={error} setAppError={setError} />} />
                    <Route exact path='*' component={() => <h1>Auth Router - Not Logged - 404 Not Found</h1>} />
                </Switch>
            </BrowserRouter>
        </div>
    )
};

export default AuthRouter;
/*

 */
