const express = require('express')
// morgan : terminal 에 log (text) 가 나올 수 있도록 하는 express middleware
var morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.render('index.ejs')
})


app.listen(3000, () => {
    console.log('listening....')
})

