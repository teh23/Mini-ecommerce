const supertest = require('supertest')
const request = supertest('http://localhost:3001')

describe('/api/product', () => {
    it('/ -- GET status&content-type', async () => {
        await request
            .get('/api/product')
            .expect('Content-Type', /application\/json/)
            .expect(200)
    })
    it('/ -- GET return value', async () => {
        await request.get('/api/product').then((res) => {
            expect(res.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: expect.any(String),
                        price: expect.any(Number),
                        productId: expect.any(Number),
                        stock: expect.any(Number),
                    }),
                ])
            )
        })
    })
})
describe('/api/product/:id', () => {
    it('/ -- GET return 404 with wrong id ', async () => {
        await request.get('/api/product/-1').expect(404)
    })
    it('/ -- GET return 200 with good id', async () => {
        const { body } = await request.get('/api/product')

        await request
            .get(`/api/product/${body[0].productId}`)
            .expect(200)
            .then((res) => {
                expect(JSON.stringify(res.body)).toBe(JSON.stringify(body[0]))
            })
    })
})
1
