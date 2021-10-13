import { React } from "react";
import { isAuthenticated } from "../utils/auth";
import { Route, Redirect } from "react-router-dom";
import '../styles/App.css'

// Essa função funciona de forma semelhante a um middleware, sempre que quisermos que uma rota seja segura iremos usar
// o componente PrivateRoute ao invés de Route, que irá cair aqui, onde ocorre a verificação se o usuário está autenticado
// se sim, continua o seu caminho original, se não é redirecionado
const PrivateRoute = ({ component: Component, ...rest }) => (
    <div className='container'>
        <Route // Cria uma rota com o componente Route

            {...rest}
            render={props =>
                isAuthenticated() ? (
                    <Component {...props} /> // Se sim renderiza o componente com as props recebidas
                ) : ( // Senão, redireciona o usuário para algum path junto com o state dele para que ele não perca o histórico de navegação
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
            }
        />
    </div>
);

export default PrivateRoute;
