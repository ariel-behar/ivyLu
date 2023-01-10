import React from 'react'
import { isAuthRouteGuard } from '../hoc/isAuthRouteGuard'

function ShoppingCartView() {
  return (
    <div>ShoppingCartView</div>
  )
}

export default isAuthRouteGuard(ShoppingCartView)