const express = require('express')
const app = express()

const cors = require('cors')

const port = process.env.PORT || 3001
const bodyParser = require('body-parser')

const model = require('./models/index')

const routes = require('./routes/index')

app.use(cors())
app.use(bodyParser.json())
app.use('/api', routes)
app.use(express.json())

model.sequelize.sync({}).then(() => {
    app.listen(port, () => console.log('Rodando API...'))
})

