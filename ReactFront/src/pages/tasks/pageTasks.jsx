/* Libraries */
import { React } from "react";
/* Components */
import Header from "./Header";
import Tasks from "./Tasks";
import AddTask from "./AddTask";
/* CSS */
import '../../styles/App.css'

const PageTasks = () => {

    return (
        <div className='container'>
            <Header />
            <AddTask />
            <Tasks />
        </div>
    );
}

export default PageTasks;