import { Link as RouterLink } from 'react-router-dom'

import { User } from "../../models/User"
import getUserRole from "../../utils/getUserRole"

import { IdType } from "../../types/common/common-types"

import maleAvatar from '../../assets/img/male-avatar.png'
import femaleAvatar from '../../assets/img/female-avatar.png'

import Button from "@mui/material/Button"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import StyledTableCell from "./StyledTableCell"
import StyledTableRow from "./StyledTableRow"

interface Props {
    entityType: 'client' | 'staff',
    entities: Omit<User, 'password'>[],
    onDeleteButtonClickHandler: (_id: IdType, entityType: 'client' | 'staff') => void
}

function UserDataTable({
    entityType,
    entities,
    onDeleteButtonClickHandler
}: Props) {
    return (
        <>
            <TableHead>
                <TableRow>
                    <StyledTableCell ></StyledTableCell>
                    <StyledTableCell >Role</StyledTableCell>
                    <StyledTableCell >First Name</StyledTableCell>
                    <StyledTableCell >Last Name</StyledTableCell>
                    <StyledTableCell align='center'>Email</StyledTableCell>

                    {entityType === 'staff' && <StyledTableCell align='center'>Edit</StyledTableCell> }
                    
                    <StyledTableCell align='center'>Delete</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>

                {
                    (entities as Omit<User, 'password'>[]).map((user) => (
                        <StyledTableRow
                            key={user._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>
                                <img
                                    height='50px'
                                    src={
                                        user.imgUrl
                                            ? user.imgUrl
                                            : (user.gender === 'male' ? maleAvatar : femaleAvatar)}
                                    alt={`${user.gender} avatar`}
                                />
                            </TableCell>
                            <TableCell>{getUserRole(user.role).capitalized}</TableCell>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>

                            <TableCell align='center'>{user.email}</TableCell>

                            {entityType === 'staff' &&
                                <TableCell align='center'>
                                    <Button
                                        variant="text"
                                        component={RouterLink}
                                        to={`/management/users/${user._id}/edit`}>
                                        Edit
                                    </Button>
                                </TableCell>
                            }

                            <TableCell align='center'>
                                <Button variant="text" color="error" onClick={() => onDeleteButtonClickHandler(user._id, entityType)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </StyledTableRow>
                    ))
                }
            </TableBody>
        </>
    )
}

export default UserDataTable