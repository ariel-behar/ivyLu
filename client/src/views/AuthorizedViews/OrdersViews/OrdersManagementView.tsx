import Box from '@mui/material/Box';
import { useLoaderData } from 'react-router-dom'
import DataTable from '../../../components/DataTable/DataTable'
import { Order } from '../../../models/Order';

function OrdersManagementView() {
	const orders = useLoaderData() as Order[] | null;

	return (
		<>
			{/* <div>OrdersManagementView</div> */}

			<Box height='70.75px' ></Box>

			<DataTable entityType='order' entities={orders} />
		</>
	)
}

export default OrdersManagementView