import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import uniqid from "uniqid";

import { Product } from "../models/Product";

import ConfirmationDialog from "../components/Common/ConfirmationDialog";

import MediaCard from "../components/MediaCard";
import Grid from "@mui/material/Grid";


function ProductsView() {
	const products = useLoaderData() as Product[]
	const [showConfirmationDialog, setShowConfirmationDialog] = useState<boolean>(false)
	const [deleteProduct, setDeleteProduct] = useState<{_id:string, title:string}>({
		_id: '',
		title: ''
	})

	const onDeleteButtonClickHandler = (_id: string, title: string): void => {
		setShowConfirmationDialog(true)
		setDeleteProduct({_id, title})
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
						products.map((product: Product) => {
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
{/* 
			{showConfirmationDialog
				? <ConfirmationDialog
					showConfirmationDialog={showConfirmationDialog}
					closeConfirmationDialog={closeConfirmationDialog}
					itemToDelete={{ _id: deleteProduct._id, title: deleteProduct.title }}
					itemToDeleteType={'product'}
				/>
				: ''
			} */}
		</>
	)
}

export default ProductsView