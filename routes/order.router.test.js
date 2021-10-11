const supertest = require('supertest')
const request = supertest('http://localhost:3001')
describe('POST /api/order', () => {
    it('--POST /order/ -- wrong id  --  404', async () => {
        await request
            .post('/api/order')
            .send({
                productId: -1,
                quantity: 1,
            })
            .expect(404)
    })
    it('--POST /order/ -- correct id and stock -- 200', async () => {
        const { body } = await request.get('/api/product')
        const product = body.filter((ele) => ele.stock > 0)
        await request
            .post('/api/order')
            .send({
                productId: product[0].productId,
                quantity: 1,
            })
            .expect(200)
            .then((res) => {
                request.get('/api/order/' + res.body).then((get) => {
                    expect(res.body).toBe(get.body._id)
                })
            })
    })
    it('--POST /order/ -- There arent products in stock -- 200', async () => {
        const { body } = await request.get('/api/product')
        const product = body.filter((ele) => ele.stock > 0)
        await request
            .post('/api/order')
            .send({
                productId: product[0].productId,
                quantity: product[0].stock + 2,
            })
            .expect(400)
    })
})

describe('GET /api/order/:id', () => {
    it('--GET /order/id -- 200', async () => {
        const { body } = await request.get('/api/product')
        const product = body.filter((ele) => ele.stock > 0)
        await request
            .post('/api/order')
            .send({
                productId: product[0].productId,
                quantity: 1,
            })
            .then((res) => {
                request.get('/api/order/' + res.body).then((get) => {
                    expect(res.body).toBe(get.body._id)
                })
            })
    })
    it('--GET /order/id -- 200', async () => {
        await request.get('/api/order/' + -1).expect(404)
    })
})
