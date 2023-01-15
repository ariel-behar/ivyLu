import { useLoaderData } from 'react-router-dom'
import DataTable from '../../../components/DataTable/DataTable'
import { Order } from '../../../models/Order';

function OrdersManagementView() {
	const orders = useLoaderData() as Order[] | null;

	return (
		<>
			<div>OrdersManagementView</div>

			<DataTable entityType='order' entities={orders} />
		</>
	)
}

export default OrdersManagementView