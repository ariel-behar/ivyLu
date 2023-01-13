import Container from '@mui/material/Container'
import React from 'react'
import { isAuthRouteGuard } from '../hoc/isAuthRouteGuard'

function ShoppingCartView() {
  return (
    <Container>
      <div>ShoppingCartView</div>
      <h1>Under Construction</h1>
    </Container>
  )
}

export default isAuthRouteGuard(ShoppingCartView)