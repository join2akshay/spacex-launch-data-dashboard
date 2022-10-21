import { Box } from '@mui/material'
import React from 'react'
import Dashboard from '../../Component/Dashboard'
import Header from '../../Component/Header'

export default function Home() {
  return (
    <Box marginLeft='1rem' marginRight='1rem'>
    <Header/>
    <Dashboard/>
    </Box>
  )
}
