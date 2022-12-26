import { useEffect, useState } from "react";
import uniqid from "uniqid";
import MediaCard from "../components/MediaCard";
import Stack from '@mui/material/Stack';

import * as serviceServices from '../services/serviceServices'

function ServicesView() {
	let [services, setServices] = useState<object[]>([]);

	useEffect(() => {
		serviceServices.getAll()
			.then(data => {
				setServices(data)
			})

		return () => {
		}
	}, [])

	// "_id": string,
	// "title": string
	// "description": string,
	// "additionalComments": string,
	// "imgUrl": string, 
	// "price": 40,
	// "duration": string,
	// "creatorId": string,

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