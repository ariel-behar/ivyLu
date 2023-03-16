import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import React from 'react'
import { isAuthRouteGuard } from '../hoc/isAuthRouteGuard'

function ShoppingCartView() {
  return (
    <Box py={3}>
      <Container>
        {/* <div>ShoppingCartView</div> */}
        <h1>Under Construction</h1>
      </Container>
    </Box>
  )
}

export default isAuthRouteGuard(ShoppingCartView)