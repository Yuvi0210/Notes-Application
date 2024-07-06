const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

connectToMongo();
const app = express()
const port = process.env.PORT || 5000


app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())



//Availabe routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.use('/api/file', require('./routes/file'))

app.get('/', (req, res) => {
    res.send('Hello World')
    // res.sendFile(__dirname + '/testpages/homepage.html')
})

app.listen(port, () => {
    console.log(`iNotebook app is running at http://localhost:${port}`)
})

