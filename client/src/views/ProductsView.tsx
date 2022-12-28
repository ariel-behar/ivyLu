import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import uniqid from "uniqid";

import { ProductFromDBInterface } from "../types/productTypes";

import ConfirmationDialog from "../components/Common/ConfirmationDialog";

import MediaCard from "../components/MediaCard";
import Grid from "@mui/material/Grid";

function ProductsView() {
	const products = useLoaderData() as ProductFromDBInterface[]
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
			<div>ProductsView</div>
			
			<Grid container spacing={2} >
				{
					products ?
						products.map((product: ProductFromDBInterface) => {
							return (
								<Grid item lg={3} key={uniqid()}>
									<MediaCard
										key={uniqid()}
										item={product}
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
					itemToDelete={{ _id: deleteService._id, title: deleteService.title }}
					itemToDeleteType={'service'}
				/>
				: ''
			}
		</>
	)
}

export default ProductsView