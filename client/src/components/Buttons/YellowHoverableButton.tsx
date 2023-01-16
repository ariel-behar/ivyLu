import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";

import { Product } from "../../models/Product";
import { Service } from "../../models/Service";

import Button from "@mui/material/Button";

interface Props {
    entity: Service | Product,
    entityType: 'service' | 'product',
    children: React.ReactNode
}

function YellowHoverableButton({
    entity, 
    entityType, 
    children
}: Props) {
    const [hovered, setHovered] = useState<boolean>(false);
    const { isLoggedIn } = useAuthContext() as { isLoggedIn: boolean };

    return (
        <Button
            variant="contained"
            to={isLoggedIn ? `/${entityType}s/${entity._id}/${entityType === 'product' ? 'order' : 'schedule'}` : `/login`}
            component={RouterLink}

            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}

            sx={{
                backgroundColor: 'main.yellow.dark',
                color: 'black',
                '&:hover': {
                    transform: hovered ? 'scale(1.1)' : 'scale(1.0)',
                    backgroundColor: 'main.yellow.primary',
                }
            }}
        >
            {children}
        </Button>
    )
}

export default YellowHoverableButton