/* Libraries */
import { React } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
/* Components */
import PageTasks from '../pages/tasks/pageTasks';
import TaskDetails from '../pages/taskDetails/taskDetails'
/* Context */
import { TaskProvider } from '../contexts/tasksContext';
/* CSS */
import '../styles/App.css'

// Create different routes for the URL accessed by authenticated users
const AppRouter = () => {
    console.log('Entrei no AppRouter')
    return (
        <div>
            <BrowserRouter>
                <TaskProvider>
                    <Switch>
                        <Route exact path="/tasks" component={PageTasks} />
                        <Route exact path="/tasks/:taskId" component={TaskDetails} />
                        <Route path='*' component={() => <h1>App Router - Logged - 404 Not Found</h1>} />
                    </Switch>
                </TaskProvider>
            </BrowserRouter>
        </div>
    )
};

export default AppRouter;