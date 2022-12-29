import uniqid from "uniqid";
import { Link as RouterLink, useLoaderData } from "react-router-dom";

import { ServiceFromDBInterface } from "../../types/serviceTypes";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

function ServicesGuestCustomerView() {
    const services = useLoaderData() as ServiceFromDBInterface[];

    return (
        <>
            <div>ServicesGuestCustomerView</div>
            <ImageList
                // sx={{ width: 500, height: 450 }}
                cols={3}
            // rowHeight={164}
            >
                {
                    services.map(service => (
                        <RouterLink to={`/services/${service._id}/details`} key={uniqid()}>
                            <ImageListItem key={uniqid()}>
                                <img style={{ width: 'auto', height: '300px' }}
                                    src={`${service.imgUrl}`}
                                    alt={service.title}
                                    loading='lazy'
                                />
                                <ImageListItemBar title={service.title} />
                            </ImageListItem>
                        </RouterLink>
                    ))
                }
            </ImageList>
        </>
    )
}

export default ServicesGuestCustomerView