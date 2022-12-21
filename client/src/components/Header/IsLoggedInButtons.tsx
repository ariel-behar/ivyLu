import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext';

function IsLoggedInButtons() {
    const { user } = useAuthContext() as any;

    return (
        <>
            <li>
                <Link to='/dashboard'>Dashboard</Link>
            </li>

            {(user.role === 2 || user.role === 3)
                ?
                <>
                    <li>
                        <Link to='/orders-management'>Orders Management</Link>
                    </li>
                    <li>
                        <Link to='/services-management'>Services Management</Link>
                    </li>
                    <li>
                        <Link to='/products-management'>Products Management</Link>
                    </li>
                </>
                : ''
            }

            {
                user.role === 3
                    ?
                    <>
                        <li>
                            <Link to='/user-management'>User Management</Link>
                        </li>
                    </>
                    : ''
            }

            <li>
                <Link to='/logout'>Logout</Link>
            </li>
        </>
    )
}

export default IsLoggedInButtons;