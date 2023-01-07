import { useLoaderData } from "react-router-dom";
import uniqid from "uniqid";

import { Product } from "../models/Product";

import MediaCard from "../components/MediaCard";
import Grid from "@mui/material/Grid";


function ProductsView() {
	const products = useLoaderData() as Product[]

	return (
		<>
			<div>ProductsView</div>

			<Grid container spacing={2} >
				{products &&
					products.map((product: Product) => {
						return (
							<Grid item lg={3} key={uniqid()}>
								<MediaCard
									key={uniqid()}
									item={product}
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