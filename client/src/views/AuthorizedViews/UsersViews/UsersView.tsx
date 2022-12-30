import { useLoaderData } from "react-router-dom"
import { User } from "../../../models/User"

function UsersView() {
    const users = useLoaderData() as Omit<User,'password'>[]

    return (
        <>
            <div>UsersView</div>
            {
                users
                    ? users.map((user) => (
                        <div>
                            <h3>{user.firstName} {user.lastName}</h3>
                            <h4>{user.role}</h4>
                            <h4>{user.gender}</h4>
                            <h5>{user.phone}</h5>
                            <h5>{user.email}</h5>

                        </div>
                    ))
                    : ''

            }
        </>
    )
}

export default UsersView