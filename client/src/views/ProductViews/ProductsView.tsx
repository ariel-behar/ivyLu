import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import uniqid from "uniqid";

import { Product } from "../../models/Product";
import { ApiEntity, ApiEntityImpl } from "../../services/entityServices";
import { AuthTokenType, IdType } from "../../types/common/common-types";
import { TProductCategories } from "../../utils/constants";
import { useNotificationContext } from "../../contexts/NotificationContext";

import ProductCard from "../../components/ProductCard";
import Grid from "@mui/material/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

import CachedIcon from '@mui/icons-material/Cached';
import Box from "@mui/material/Box";


const entityServices: ApiEntity<IdType, Product, AuthTokenType> = new ApiEntityImpl<IdType, Product, AuthTokenType>('products');

function ProductsView() {
	const { displayNotification } = useNotificationContext() as any;
	const [products, setProducts] = useState<Product[]>(useLoaderData() as Product[])
	const [availableProductCategories, setAvailableProductCategories] = useState<TProductCategories[] | []>([])
	const [currentlySelectedCategory, setCurrentlySelectedCategory] = useState<TProductCategories | 'all'>('all')

	const onCategoryClickHandler = async (category: TProductCategories | 'all') => {
		try {
			let productsResponse;

			if (category !== 'all') {
				productsResponse = await entityServices.getManyFilteredBy({ productCategory: category })
			} else {
				productsResponse = await entityServices.getAll()
			}
			setProducts(productsResponse)
			setCurrentlySelectedCategory(category)
		} catch (err) {
			displayNotification(err, 'error')
		}
	}

	useEffect(() => {
		let categories = products.map(product => product.productCategory)
		let filteredCategories = categories.filter((category, index) => categories.indexOf(category) === index)

		setAvailableProductCategories(filteredCategories)

	}, [])

	return (
		<Box py={3}>
			<div>ProductsView</div>

            <Stack direction='row' alignItems='center' sx={{overflow: 'hidden'}}>
				<Typography variant="h3" sx={{ color: 'common.white', marginRight: '30px' }}>Products</Typography>
				<hr style={{width: '100%', height: '2px'}}/>
			</Stack>

			<Stack direction='row' justifyContent='space-between' alignItems='center'>
				<Typography variant="h5" sx={{ color: 'common.white' }}>Categories:</Typography>
				<Breadcrumbs
					aria-label="breadcrumb"
					separator=""
					maxItems={100}

				>
					<Chip
						className={currentlySelectedCategory === 'all' ? 'active' : ''}
						key={uniqid()}
						label={`ALL`}
						onClick={() => onCategoryClickHandler('all')}
						icon={<CachedIcon />}
						style={{ cursor: 'pointer', marginTop: '10px' }}
						sx={{
							"&:hover": { backgroundColor: 'main.teal.light' },
							backgroundColor: 'main.teal.primary',
							'&.active': { fontWeight: 'fontWeightBold', transform: 'scale(1.1)', backgroundColor: 'main.teal.light' }
						}}
					/>

					{
						availableProductCategories.map(category => {
							return <Chip
								className={currentlySelectedCategory === category ? 'active' : ''}
								key={uniqid()}
								label={`${category.substring(0,).toUpperCase()}`}
								onClick={() => onCategoryClickHandler(category)}
								style={{ cursor: 'pointer', marginTop: '10px' }}
								sx={{
									"&:hover": { backgroundColor: 'main.teal.dark' },
									backgroundColor: 'main.teal.primary',
									'&.active': { fontWeight: 'fontWeightBold', transform: 'scale(1.1)', backgroundColor: 'main.teal.light' }
								}}
							/>
						})
					}
				</Breadcrumbs>
			</Stack>

			<Grid container spacing={0} mt={3} >
				{products &&
					products.map((product: Product) => {
						return (
							<Grid item lg={4} key={uniqid()}  >
								<ProductCard
									key={uniqid()}
									product={product}
								/>
							</Grid>
						)
					})
				}
			</Grid>
		</Box>
	)
}
export default ProductsView