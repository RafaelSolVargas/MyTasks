import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header"
import AddTask from "./components/AddTask";
import Tasks from './components/Tasks'
import TaskDetails from "./components/TaskDetails";

import './App.css'

const App = () => {
  // Cria a variável tasks que vai guardar os dados que serão enviados, e a função
  // setTasks('x') sendo que x é o valor para ser enviado para o Front e atualizado
  let [tasks, setTasks] = useState([])

  // Hook que fica observando alguma variável do sistema e é chamado sempre que essa variável tem alguma alteração
  // o segundo parâmetro da função recebe todas as variáveis que serão observadas, caso a lista esteja vazia ele só irá rodar
  // quando o componente for renderizado pela primeira vez
  // O useEffect não é feito para ser uma função async, é uma má prática, então o correto
  useEffect(() => {
    // É criarmos uma função assíncrona dentro do useEffect e executar a busca na API por meio dela
    const fetchTasks = async () => {
      // Faz o get em uma API, e retira somente o data do response
      const { data } = await axios.get(
        "https://jsonplaceholder.cypress.io/todos?_limit=10"
      )

      setTasks(data)
    }

    fetchTasks()
  }, [])

  // Função para, ao receber um taskId vai fazer um map nas tasks atuais, caso o taskId bata
  // irá retornar a task respectiva com o valor de completed invertido
  const handleTaskClick = (taskId) => {
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
  // Função para adicionar uma nova Task no frontEnd
  const handleTaskAddition = (taskTitle) => {
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

  // O APP sempre deve ser retornado dentro de uma só DIV, aqui temos a div
  // para a parte de cima que cuidará do Input e a div de baixo com as tasks
  // Também passamos como props para o componente AddTask a função handleTaskAddition
  // e para o componente Tasks a variável tasks atuais
  // O Router é o BrowserRouter da biblioteca React Router DOM que imita a paginação dentro de
  // uma aplicação React, pois o React em si só possui um HTML, então a tag BrowserRouter fica em volta 
  // de toda a aplicação

  // Depois temos o Route, que é usado para configurar uma rota que será utilizada e irá renderizar alguma coisa
  // ela recebe os parâmetros path, exact (para não permitir queryParams) e depois o render, o qual vai receber
  // o que ela deve renderizar (sempre dentro de uma única div)
  return (
    <Router>
      <h1 className="container">
        <Header />
        <Route
          path="/"
          exact
          render={() => (
            <>
              <AddTask handleTaskAddition={handleTaskAddition} />
              <Tasks tasks={tasks}
                handleTaskClick={handleTaskClick}
                handleTaskDelete={handleTaskDelete} />
            </>
          )}
        />

        <Route
          path="/:taskTitle"
          exact
          component={TaskDetails}

        />
      </h1>
    </Router >
  )
}


export default App;