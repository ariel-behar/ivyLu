import { useState } from "react";
import { useLoaderData,} from "react-router-dom";
import uniqid from "uniqid";

import { Service } from "../../../models/Service";
import { IdType } from "../../../types/common/commonTypes";

import ConfirmationDialog from "../../../components/Common/ConfirmationDialog";
import MediaCard from "../../../components/MediaCard";

import Grid from "@mui/material/Grid";
import DataTable from "../../../components/DataTable/DataTable";


function ServicesOperatorAdminView() {
    const services = useLoaderData() as Service[];


    return (
        <>
            <div>ServicesOperatorAdminView</div>

            <DataTable entityType={"service"} entities={services} />
            
            {/* <Grid container spacing={2} >
                {
                    services ?
                        services.map((service: Service) => {
                            return (
                                <Grid item lg={3} key={uniqid()}>
                                    <MediaCard
                                        key={uniqid()}
                                        item={service}
                                        onDeleteButtonClickHandler={onDeleteButtonClickHandler}
                                    />
                                </Grid>
                            )
                        })
                        : ''
                }
            </Grid> */}


        </>
    )
}

export default ServicesOperatorAdminView