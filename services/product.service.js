const Products = require('../models/product')
const messageBus = require('../globals/event')
const Data = require('../globals/data')
var mongoose = require('mongoose')

const addProduct = async (obj) => {
    if (!(await Products.findOne({ productId: obj.productId }))) {
        //clearing collection before new connection
        await Products.deleteMany({})

        const newProduct = new Products(obj)
        await newProduct.save()
    } else {
        console.log('#############################################')
    }
}

const findProduct = async () => {
    const products = await Products.find({}, { _id: 0, __v: 0 })
    return products
}

const findProductById = async (id, getTrueId = false) => {
    const products = await Products.findOne(
        { productId: id },
        { _id: getTrueId, __v: 0 }
    )
    return products
}

const decreaseProduct = async ({ productId, quantity }) => {
    //If the product exists, we add it to the queue, Then we send the 'Send' signal
    try {
        const product = await findProductById(productId, true)
        console.log(product, '----**')
        if (product && product !== null) {
            const subtraction = product.stock - quantity
            if (subtraction >= 0) {
                product.stock = subtraction

                //!! delete this if ws will work
                await Products.updateOne(
                    { productId: productId },
                    { stock: product.stock }
                )

                messageBus.emit('send', {
                    operation: 'product.stock.decrease',
                    payload: {
                        productId: product.productId,
                        stock: quantity,
                    },
                    correlationId: mongoose.Types.ObjectId(
                        product._id
                    ).toString(),
                })

                // if (get) {
                //     messageBus.emit("message", productId);
                //     console.log("DECRESE");
                // }
            } else {
                return 400
            }
        } else {
            return 404
        }
    } catch (err) {
        console.log(err.message)
        return 404
    }
}

const editProduct = async ({ productId, stock }) => {
    try {
        const product = await findProductById(productId)
        if (product) {
            //Is this Use Case?
            const get = await Products.updateOne(
                { productId: productId },
                { stock: stock }
            )
            // if (get) {
            //     messageBus.on("message", productId);
            // }

            return product
        } else {
            return { error: true, message: 'No product' }
        }
    } catch {
        return { error: true, message: 'Error' }
    }
}

module.exports = {
    addProduct,
    findProduct,
    findProductById,
    decreaseProduct,
    editProduct,
}
