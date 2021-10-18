import React from "react";
import Routes from "./routes"
import { AuthProvider } from "./contexts/authContext";
import { LoadingProvider } from "./contexts/loadingContext";

// Coloca um estilo padrão em todo o App
import './styles/index.css';

const App = () =>
    <LoadingProvider>
        <AuthProvider>
            <Routes />
        </AuthProvider>
    </LoadingProvider>

export default App;
