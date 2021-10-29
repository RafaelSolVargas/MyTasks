/* Libraries */
import { React } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
/* Components */
import PageTasks from '../pages/tasks/pageTasks';
import TaskDetails from '../pages/taskDetails/taskDetails'
import NotFoundApp from "../pages/404App/NotFoundApp";
/* Context */
import { TaskProvider } from '../contexts/tasksContext';
/* CSS */
import '../styles/App.css'

// Create different routes for the URL accessed by authenticated users
const AppRouter = () => {
    return (
        <div>
            <BrowserRouter>
                <TaskProvider>
                    <Switch>
                        <Route exact path="/" component={PageTasks} />
                        <Route exact path="/tasks/:taskId" component={TaskDetails} />
                        <Route path='*' component={NotFoundApp} />
                    </Switch>
                </TaskProvider>
            </BrowserRouter>
        </div>
    )
};

export default AppRouter;