const express = require('express')
// morgan : terminal 에 log (text) 가 나오게 하는 express middleware
const morgan = require('morgan')
const randomstring = require('randomstring')

const app = express()

const urls = [
    {
        slug: randomstring.generate(8),
        longUrl: 'https://www.naver.com'
    }
]

app.use(morgan('dev')) // combine 보다 dev 를 적게되면 easy-readable
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    const host = req.get('host') // request header 에서 host 정보 가져오기
    res.render('index.ejs', {host, urls})
})

app.get('/:slug', (req, res) => {
    const urlItem = urls.find(item => item.slug === req.params.slug)
    if(urlItem) {
        res.redirect(301, urlItem.longUrl)
    } else {
        res.status(404)
        res.send('404 not found')
    }
})

app.listen(3000, () => {
    console.log('listening....')
})

