const app = require('./app')
const PORT = process.env.PORT || 3001
const mongoose = require('mongoose')

const url = process.env.DB_URL

mongoose
    .connect(url)
    .then((result) => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
