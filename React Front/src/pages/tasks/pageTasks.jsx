/* Libraries */
import { React } from "react";
import { v4 as uuidv4 } from 'uuid'
/* Components */
import Header from "./Header";
import Tasks from "./Tasks";
import AddTask from "./AddTask";
/* Context */
import { useTasks } from "../../contexts/tasksContext";
/* CSS */
import '../../styles/App.css'

const PageTasks = ({ Logout }) => {
    const { tasks, setTasks } = useTasks()
    const handleTaskClick = (taskId) => {
        // This function invert the boolean status of a task after it get clicked
        const newTasks = tasks.map(task => {
            if (task.id === taskId) return { ...task, completed: !task.completed }
            return task
        })
        setTasks(newTasks)
    }
    const handleTaskDelete = (taskId) => {
        const newTasks = tasks.filter((task) => task.id !== taskId)
        setTasks(newTasks)
    }
    const handleTaskAddition = (taskTitle) => {
        // Função para adicionar uma nova Task no frontEnd
        // Faz spread no array atual e adiciona o titulo da nova task, que será passado
        // como parâmetro dessa função
        const newTasks = [
            ...tasks,
            {
                title: taskTitle,
                id: uuidv4(),
                completed: false
            }
        ]

        // Após criar o array de tasks ele usa a função setTasks para atualizar o Front 
        setTasks(newTasks)
    }

    return (
        <div className='container'>
            <Header />
            <AddTask handleTaskAddition={handleTaskAddition} />
            <Tasks handleTaskClick={handleTaskClick} handleTaskDelete={handleTaskDelete} tasks={tasks} Logout={Logout} />
        </div>
    );
}

export default PageTasks;