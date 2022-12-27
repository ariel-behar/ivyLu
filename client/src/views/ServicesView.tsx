import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import uniqid from "uniqid";

import MediaCard from "../components/MediaCard";

import Service from "../models/Service";
import { Grid } from "@mui/material";
import ConfirmationDialog from "../components/ConfirmationDialog";

function ServicesView() {
	const services = useLoaderData() as Service[]
	const [showConfirmationDialog, setShowConfirmationDialog] = useState<boolean>(false)
	const [deleteService, setDeleteService] = useState<{_id:string, title:string}>({
		_id: '',
		title: ''
	})

	const onDeleteButtonClickHandler = (_id: string, title: string): void => {
		setShowConfirmationDialog(true)
		setDeleteService({_id, title})
	}

	const closeConfirmationDialog = (): void => {
		setShowConfirmationDialog(false)
	}

	return (
		<>
			<div>ServicesView</div>
			<Grid container spacing={2} >
				{
					services ?
						services.map((service: any) => {
							return (
								<Grid item lg={3}>
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
										}}
										onDeleteButtonClickHandler={onDeleteButtonClickHandler}
									/>
								</Grid>
							)
						})
						: ''
				}
			</Grid>

			{showConfirmationDialog
				? <ConfirmationDialog
					showConfirmationDialog={showConfirmationDialog}
					closeConfirmationDialog={closeConfirmationDialog}
					itemToDelete={{_id: deleteService._id, title: deleteService.title}}
					itemToDeleteType={'service'}
				/>
				: ''
			}
		</>
	)
}

export default ServicesView