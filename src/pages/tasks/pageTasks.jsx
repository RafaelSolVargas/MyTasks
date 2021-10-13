import { React, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'
import axios from "axios";
import Header from "./Header";
import Tasks from "./Tasks";
import AddTask from "./AddTask";

import '../../styles/App.css'

const PageTasks = ({ Logout }) => {
    let [tasks, setTasks] = useState([])
    const handleTaskClick = (taskId) => {
        // Função para, ao receber um taskId vai fazer um map nas tasks atuais, caso o taskId bata
        // irá retornar a task respectiva com o valor de completed invertido
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
    useEffect(() => {
        // É criarmos uma função assíncrona dentro do useEffect e executar a busca na API por meio dela
        const fetchTasks = async () => {
            // Faz o get em uma API, e retira somente o data do response
            const { data } = await axios.get(
                "https://jsonplaceholder.cypress.io/todos?_limit=10"
            )

            setTasks(data)
        }
        // O array vazio como segundo argumento da função avisa que essa função não observa nenhuma constante, logo ela só será 
        // executada quando o componente for renderizado pela primeira vez
        fetchTasks()
    }, [])

    return (
        <>
            <Header />
            <AddTask handleTaskAddition={handleTaskAddition} />
            <Tasks handleTaskClick={handleTaskClick} handleTaskDelete={handleTaskDelete} tasks={tasks} Logout={Logout} />
        </>
    );
}

export default PageTasks;