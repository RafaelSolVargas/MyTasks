import React, { useState } from "react";
import './AddTask.css'
import Button from './Button'

// Cria o componente completo da parte superior, e ele recebe como props a função que será chamada
// para colocar a nova task na lista
const AddTask = ({ handleTaskAddition, handleTaskDelete }) => {
    // Cria a variável para controlar os valores que foram colocados
    const [inputData, setInputData] = useState('')

    // Função para ir atualizando o valor da variável inputData conforme a label Input vai sendo alterada
    const handleInputChange = (e) => {
        setInputData(e.target.value)
    }

    // Cria uma função intermediária para chamar a função de como adicionar tasks, que veio pelas props
    // E a função intermediária será passada como valor para a propriedade onClick
    const handleAddTaskClick = () => {
        if (inputData === '') return
        handleTaskAddition(inputData)
        setInputData('')
    }

    // Retorna duas div, uma para o inputData e outra sendo o botão
    return (
        <div className="add-task-container">
            <input
                onChange={handleInputChange}
                value={inputData}
                className="add-task-input"
                type="text"
            />

            <div className="add-task-button-container">
                <Button onClick={handleAddTaskClick}>Adicionar</Button>
            </div>
        </div>
    );
}

export default AddTask;