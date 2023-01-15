import React from 'react'
import { useLoaderData } from 'react-router'
import { Order } from '../../../models/Order';

function MyOrdersView() {
  let orders = useLoaderData() as Order[];
  console.log('orders:', orders)

  return (
    <div>MyOrdersView</div>
  )
}

export default MyOrdersView