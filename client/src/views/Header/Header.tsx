import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'


function Header() {
    const { isLoggedIn } = useAuthContext() as any;

    const isLoggedInButtons = (
        <>
            <li>
                <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li>
                <Link to='/logout'>Logout</Link>
            </li>
        </>
    )

    const isNotloggedInButtons = (
        <>
            <li>
                <Link to='/login'>Login</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>

        </>
    )

    return (
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/products'>Products</Link>
            </li>
            <li>
                <Link to='/services'>Services</Link>
            </li>

            {isLoggedIn
                ? isLoggedInButtons
                : isNotloggedInButtons
            }
        </ul>
    )
}

export default Header