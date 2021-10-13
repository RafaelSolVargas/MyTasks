import React from "react";
import { useParams, useHistory } from "react-router-dom";

import Button from '../../components/Button'
import '../../styles/TaskDetails.css'
import '../../styles/App.css'

const TaskDetails = () => {
    const params = useParams();
    const history = useHistory()
    const handleBackButtonClick = () => {
        // Utiliza o hook useHistory para quando o botão voltar seja clicado, retorne o usuário
        // para onde ele estava quando o useHistory trouxe ele para cá
        history.goBack()
    }

    return (
        <div className='container'>
            <div
                className='back-button-container'
                onClick={handleBackButtonClick}
            >
                <Button>Voltar</Button>
            </div>
            <div className='task-details-container'>
                <h2>{params.taskTitle}</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis consequatur consectetur nihil quae laboriosam
                    modi, omnis eos dolore perferendis reiciendis.
                </p>
            </div>
        </div>
    );
}

export default TaskDetails;