import React from "react";
import '../styles/Button.css'

// Cria um componente de um botão padrão, que vai receber propriedades CSS padrões
// com cores do APP, aqui ele vai receber como props a função onClick dele para ser chamada
// quando o botão ser clicado e também o seu children, que será o texto que ficará no botão 
// pela variável children
const Button = ({ children, onClick, id = null }) => {
    return (
        <button className='add-button' onClick={onClick} id={id}>
            {children}
        </button>
    );
}

export default Button;