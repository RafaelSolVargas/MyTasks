import { React } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PageTasks from '../pages/tasks/pageTasks';
import TaskDetails from '../pages/taskDetails/taskDetails'

import '../styles/App.css'

// Cria duas rotas diferentes, uma aberta e outra privada, sendo que esta usa o componente personalizado que criamos
const AppRouter = () => {
    console.log('Entrei no AppRouter')
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/tasks" component={PageTasks} />
                    <Route exact path="/:taskTitle" component={TaskDetails}
                    />
                </Switch>
            </BrowserRouter>
        </div>
    )
};

export default AppRouter;