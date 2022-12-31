import { User } from "../../models/User"
import getUserRole from "../../utils/getUserRole"

import maleAvatar from '../../assets/img/male-avatar.png'
import femaleAvatar from '../../assets/img/female-avatar.png'

import Button from "@mui/material/Button"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"



interface UserDataTableInterface {
    entity: Omit<User, 'password'>[]
}

function UserDataTable({
    entity
}: UserDataTableInterface) {
    return (
        <>
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell align='center'>Email</TableCell>
                    <TableCell align='center'>Edit</TableCell>
                    <TableCell align='center'>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

                {
                    (entity as Omit<User, 'password'>[]).map((user) => (
                        <TableRow
                            key={user._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>
                                <img height='50px' src={user.gender === 'male' ? maleAvatar : femaleAvatar} alt={`${user.gender} avatar`} />
                            </TableCell>
                            <TableCell>{getUserRole(user.role).capitalized}</TableCell>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell align='center'>{user.email}</TableCell>
                            <TableCell align='center'><Button variant="text">Edit</Button></TableCell>
                            <TableCell align='center'><Button variant="text" color="error">Delete</Button></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </>
    )
}

export default UserDataTable