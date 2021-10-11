const Products = require('../models/product')
const findProduct = require('../services').productService.findProduct
const findProductById = require('../services').productService.findProductById
const messageBus = require('../globals/event')
const Data = require('../globals/data')

const getAllProduct = async (req, res, next) => {
    if (req.headers.accept === 'text/event-stream') {
        res.setHeader('Content-Type', 'text/event-stream')
        Data.push(res)
    } else {
        res.setHeader('Content-Type', 'application/json')
        const allProduct = await findProduct()
        res.status(200).json(allProduct)
    }
}
const getProductById = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const id = req.params.id
    const product = await findProductById(id)
    if (product === null) {
        res.sendStatus(404)
    } else {
        res.send(product)
    }
}
module.exports = {
    getAllProduct,
    getProductById,
}
