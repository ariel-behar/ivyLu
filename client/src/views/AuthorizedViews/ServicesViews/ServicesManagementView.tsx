import { useAuthContext } from '../../../contexts/AuthContext';


import { Outlet, Link as RouterLink, } from 'react-router-dom';

import CreateButton from '../../../components/CreateButton';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/system/Stack';



function ServicesManagementView() {
    const { isOperator, isAdmin } = useAuthContext() as any;

    return (
        <>
            <div>ServicesManagementView</div>

            {
                (isOperator || isAdmin)
                    ? (
                        <Stack direction='row' justifyContent='end'>
                            <CreateButton item={'Service'} />
                        </Stack>
                    )
                    : ""

            }


            <Outlet />
        </>
    )
}

export default ServicesManagementView