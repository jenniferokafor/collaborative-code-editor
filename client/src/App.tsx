import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Views from './routes'
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Views />
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
