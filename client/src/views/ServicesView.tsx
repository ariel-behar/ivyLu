import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import uniqid from "uniqid";

import MediaCard from "../components/MediaCard";
import Stack from '@mui/material/Stack';

import * as serviceServices from '../services/serviceServices'
import Service from "../models/Service";


function ServicesView() {
	const services = useLoaderData() as Service[]

	return (
		<>
			<div>ServicesView</div>
			<Stack direction='row' spacing={2}>
				{
					services ?
						services.map((service: any) => {
							return <MediaCard
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
						})
						: ''
				}

			</Stack>
		</>
	)
}

export default ServicesView