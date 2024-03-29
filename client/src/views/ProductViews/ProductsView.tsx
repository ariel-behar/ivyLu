import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import uniqid from "uniqid";

import { Product } from "../../models/Product";
import { ApiEntity, ApiEntityImpl } from "../../services/entityServices";
import { AuthTokenType, IdType } from "../../types/common/common-types";
import { TProductCategories } from "../../utils/constants";
import { useNotificationContext } from "../../contexts/NotificationContext";

import ProductCard from "../../components/ProductCard";

import styled from "@mui/material/styles/styled";

import Grid from "@mui/material/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import CachedIcon from '@mui/icons-material/Cached';
import Box from "@mui/material/Box";


const StyledChip = styled(Chip)`
	cursor: pointer;
	margin-top: 10px;

	background-color: ${(({theme}) => theme.palette.main.teal.primary)};

	&:hover {
		background-color: ${(({theme}) => theme.palette.main.teal.light)};
	}

	&.active {
		font-weight: bold;
		transform: scale(1.1);
		background-color: ${(({theme}) => theme.palette.main.teal.light)};
	}

	@media (max-width: 899px) {
		height: 26px;
	} 
`

const StyledHR = styled('hr')`
	width: 100%;
	height: 2px;
`

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
			{/* <div>ProductsView</div> */}

            <Stack direction='row' alignItems='center' sx={{overflow: 'hidden'}}>
				<Typography variant="h3" sx={{ color: 'common.white', marginRight: '30px' }}>Products</Typography>

				<StyledHR />
			</Stack>

			<Stack direction={{ xs: 'column', md: 'row' }} justifyContent='space-between' alignItems='center'>
				<Typography variant="h5" sx={{ color: 'common.white' }}>Categories:</Typography>

				<Breadcrumbs aria-label="breadcrumb" separator="" maxItems={100} >
					<StyledChip
						className={currentlySelectedCategory === 'all' ? 'active' : ''}
						key={uniqid()}
						label={`ALL`}
						onClick={() => onCategoryClickHandler('all')}
						icon={<CachedIcon />}
					/>

					{
						availableProductCategories.map(category => {
							return <StyledChip
								className={currentlySelectedCategory === category ? 'active' : ''}
								key={uniqid()}
								label={`${category.substring(0,).toUpperCase()}`}
								onClick={() => onCategoryClickHandler(category)}
							/>
						})
					}
				</Breadcrumbs>
			</Stack>

			<Grid container spacing={0} mt={3} >
				{products &&
					products.map((product: Product) => {
						return (
							<Grid item xs={12} sm={6} lg={4} key={uniqid()}  >
								<ProductCard key={uniqid()} product={product} />
							</Grid>
						)
					})
				}
			</Grid>
		</Box>
	)
}
export default ProductsView