import React from 'react'
import { useLoaderData } from 'react-router'
import DataTable from '../../../components/DataTable/DataTable';
import { Order } from '../../../models/Order';

function MyOrdersView() {
	let orders = useLoaderData() as Order[];
	console.log('orders:', orders)

	return (
		<>
			<div>MyOrdersView</div>

			<DataTable entities={orders} entityType='order' requester='client' />
		</>
	)
}

export default MyOrdersView