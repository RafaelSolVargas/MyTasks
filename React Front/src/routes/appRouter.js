/* Libraries */
import { React } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
/* Components */
import PageTasks from '../pages/tasks/pageTasks';
import TaskDetails from '../pages/taskDetails/taskDetails'
/* CSS */
import '../styles/App.css'

// Create different routes for the URL accessed by authenticated users
const AppRouter = () => {
    console.log('Entrei no AppRouter')
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/tasks" component={PageTasks} />
                    <Route exact path="/login" component={() => <h1>Login in App</h1>} />
                    <Route exact path="/:taskTitle" component={TaskDetails} />
                    <Route exact path='*' component={() => <h1>App Router - Logged - 404 Not Found</h1>} />
                </Switch>
            </BrowserRouter>
        </div>
    )
};

export default AppRouter;