import { Link } from 'react-router-dom'

import { useAuthContext } from '../../context/AuthContext'

import IsLoggedInButtons from './IsLoggedInButtons'
import IsNotloggedInButtons from './IsNotloggedInButtons';

function Header() {
    const { isLoggedIn } = useAuthContext() as any;


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
                ? <IsLoggedInButtons />
                : <IsNotloggedInButtons />
            }
        </ul>
    )
}

export default Header