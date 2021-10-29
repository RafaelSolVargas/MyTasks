/* Context */
import { useAuth } from '../../contexts/authContext';
/* CSS */
import '../../styles/Header.css'

const Header = () => {
    const { user } = useAuth()

    return (
        <div className='header-container'>
            <span className='welcome'>Welcome, {user.name}</span>
            <span className='your-tasks'>Here are your tasks</span>
        </div>
    );
}

export default Header;