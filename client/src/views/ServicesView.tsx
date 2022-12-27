import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import uniqid from "uniqid";

import MediaCard from "../components/MediaCard";
import Stack from '@mui/material/Stack';

import * as serviceServices from '../services/serviceServices'
import Service from "../models/Service";
import { Grid } from "@mui/material";


function ServicesView() {
	const services = useLoaderData() as Service[]

	return (
		<>
			<div>ServicesView</div>
			<Grid container spacing={2} lg={12}>
				{
					services ?
						services.map((service: any) => {
							return (
								<Grid item>
									<MediaCard
										key={uniqid()}
										service={{
											_id: service._id,
											title: service.title,
											description: service.description,
											additionalComments: service.additionalComments,
											imgUrl: service.imgUrl,
											price: service.price,
											duration: service.duration,
											creatorId: service.creatorId
										}} />
								</Grid>
							)
						})
						: ''
				}
			</Grid>
		</>
	)
}

export default ServicesView