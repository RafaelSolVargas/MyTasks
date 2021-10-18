/* Libraries */
import { React } from "react";
/* Components */
import AuthRouter from "./authRouter";
import AppRouter from './appRouter';
import Loading from "../components/Loading";
/* Context */
import { useAuth } from "../contexts/authContext";
import { useLoading } from "../contexts/loadingContext";
/* CSS */
import '../styles/App.css'

// Create an index that defines with the Auth Context if the user is signed, and load the respective 
// route, the auth or the app, and also configure the loading screen
const Routes = () => {
    const { signed } = useAuth()
    const { loadingData } = useLoading()
    console.log(`Signed: ${signed}`)
    return signed ?
        (
            <>
                <Loading loading={loadingData.isLoading} message={loadingData.message}></Loading>
                < AppRouter />
            </>
        ) : (
            <>
                <Loading loading={loadingData.isLoading} message={loadingData.message}></Loading>
                < AuthRouter />
            </>
        )
};

export default Routes;