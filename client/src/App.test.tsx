import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import '@testing-library/jest-dom'
test('render app page', () => {
    render(<App />)
    expect(screen.getByText('Products')).toBeInTheDocument()
})
