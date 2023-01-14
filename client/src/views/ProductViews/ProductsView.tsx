import React, { useEffect, useState } from "react";
import { useLoaderData, NavLink as RouterNavLink } from "react-router-dom";
import uniqid from "uniqid";

import { Product } from "../../models/Product";
import { ApiEntity, ApiEntityImpl } from "../../services/entityServices";
import { AuthTokenType, IdType } from "../../types/common/common-types";
import { TProductCategories } from "../../utils/constants";

import ProductCard from "../../components/ProductCard";
import Grid from "@mui/material/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useNotificationContext } from "../../contexts/NotificationContext";


const entityServices: ApiEntity<IdType, Product, AuthTokenType> = new ApiEntityImpl<IdType, Product, AuthTokenType>('products');

function ProductsView() {
	const { displayNotification } = useNotificationContext() as any;
	const [products, setProducts] = useState<Product[]>(useLoaderData() as Product[])
	const [availableProductCategories, setAvailableProductCategories] = useState<TProductCategories[] | []>([])

	const onCategoryClickHandler = async (category: TProductCategories | null) => {
		try {
			let productsResponse;
			if(category ) {
				productsResponse = await entityServices.getManyFilteredBy({productCategory: category})

				
			} else {
				productsResponse = await entityServices.getAll()
			}

			setProducts(productsResponse)
		} catch (err) {
			displayNotification(err, 'error')
		}
	}

	useEffect(() => {
		let categories = products.map(product => product.productCategory)
		let filteredCategories = categories.filter((category, index) => categories.indexOf(category) === index)

		setAvailableProductCategories(filteredCategories)

		return () => {
		}
	}, [])

	return (
		<>
			<div>ProductsView</div>

			<Typography variant="h3">Products</Typography>
			
			<Stack direction='row' justifyContent='space-between' alignItems='center'>
			<Typography variant="h5">Categories:</Typography>
				<Breadcrumbs
					aria-label="breadcrumb"
					separator=""
					maxItems={100}
					
				>

					<Chip
						key={uniqid()}
						label={`ALL`}
						style={{ cursor: 'pointer', marginTop: '10px', border: '2px solid black' }}
						sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}
						onClick={() => onCategoryClickHandler(null)}
					/>

					{
						availableProductCategories.map(category => {
							return <Chip
								key={uniqid()}
								label={`${category.substring(0,).toUpperCase()}`}
								onClick={() => onCategoryClickHandler(category)}
								style={{ cursor: 'pointer', marginTop: '10px' }}
								sx={{ '&.active': { fontWeight: 'fontWeightBold' } }}
							/>
						})
					}
				</Breadcrumbs>
			</Stack>


			<Grid container spacing={3} mt={3}>
				{products &&
					products.map((product: Product) => {
						return (
							<Grid item lg={4} key={uniqid()}>
								<ProductCard
									key={uniqid()}
									product={product}
								/>
							</Grid>
						)
					})
				}
			</Grid>

		</>
	)
}

export default ProductsView