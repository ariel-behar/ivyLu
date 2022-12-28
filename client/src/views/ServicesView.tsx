import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import uniqid from "uniqid";

import ConfirmationDialog from "../components/Common/ConfirmationDialog";

import { ServiceFromDBInterface } from "../types/serviceTypes";
import { IdType } from "../types/common/commonTypes";

import MediaCard from "../components/MediaCard";
import Grid from "@mui/material/Grid";



function ServicesView() {
	const services = useLoaderData() as ServiceFromDBInterface[]
	const [showConfirmationDialog, setShowConfirmationDialog] = useState<boolean>(false)
	const [deleteService, setDeleteService] = useState<{_id:string, title:string}>({
		_id: '',
		title: ''
	})

	const onDeleteButtonClickHandler = (_id: IdType, title: string): void => {
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
						services.map((service: ServiceFromDBInterface) => {
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