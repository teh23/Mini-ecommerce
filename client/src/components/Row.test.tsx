import React from 'react'
import { render, screen } from '@testing-library/react'
import Row from './Row'
import '@testing-library/jest-dom'

describe('render row', () => {
    const product = { productId: 94, stock: 123, name: "asd", price: 123 }

    it('name', () => {
        render(<Row product={product} />)
        expect(screen.queryByText(product.name)).toBeInTheDocument()

    })
    it('stock', () => {
        render(<Row product={product} />)
        expect(screen.queryByText(`z ${product.stock} sztuk`)).toBeInTheDocument()
    })
    it('price', () => {
        render(<Row product={product} />)
        expect(screen.queryByText(product.price / 100)).toBeInTheDocument()
    })
    it('productId', () => {
        render(<Row product={product} />)
        expect(screen.queryByText(product.stock)).not.toBeInTheDocument()
    })

})



