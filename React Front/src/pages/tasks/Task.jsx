import React from "react";
import { CgClose, CgInfo } from 'react-icons/cg'
import { useHistory } from "react-router-dom";


import '../../styles/Task.css'

// É necessário que as funções onClick sejam configuradas como arrow functions sem parâmetros
// () => function(id) quando elas precisarem passar o Id, se não for configurado essas arrow functions
// a função será carregada assim que o componente for configurado
// Tem um div para o titulo que onClick chama para alterar o status completed dele
// Outra div para o x que onClick manda o Id para remover do DB
const Task = ({ task, handleTaskClick, handleTaskDelete }) => {
    const history = useHistory()

    const handleTaskDetailsClick = () => {
        // useHistory é um hook que pode ser chamado para redirecionar o usuário para outra rota
        // aqui está sendo para jogar o user para uma rota com o nome da Task
        history.push(`/${task.title}`)
    }

    return (
        <div className='task-container'
            style={task.completed ? { borderLeft: '6px solid chartreuse' } : {}}>
            <div className='task-title' onClick={() => handleTaskClick(task.id)}>
                {task.title}
            </div>
            <div className='buttons-container'>
                <button
                    className='remove-task-button'
                    onClick={() => handleTaskDelete(task.id)}
                >
                    <CgClose />
                </button>
                <button
                    className='see-task-details-button'
                    onClick={handleTaskDetailsClick}
                >
                    <CgInfo />
                </button>
            </div>
        </div>
    )
}

export default Task;