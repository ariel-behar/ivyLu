
import uniqid from "uniqid";

import { Product } from "../../models/Product";


import ProductCard from "../../components/ProductCard";
import Grid from "@mui/material/Grid";
import { useProducts } from "./ProductsRootView";

function ProductsView() {
	const products = useProducts() as Product[];

	return (
		<>
			<div>ProductsView</div>

			<Grid container spacing={3} mt={3}>
				{products &&
					products.map((product: Product) => {
						return (
							<Grid item lg={4} key={uniqid()} >
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