require('dotenv').config() // dotenv 를 위해 가장 상단
const express = require('express')
// morgan : terminal 에 log (text) 가 나오게 하는 express middleware
const morgan = require('morgan')
const randomstring = require('randomstring')
// .body. 내용을 받을 수 있도록
const bodyParser = require('body-parser')

const app = express()

const urls = [{
	slug: randomstring.generate(8),
	longUrl: 'https://www.naver.com'
}]

app.use(morgan('dev')) // combine 보다 dev 를 적게되면 easy-readable
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    const host = req.get('host') // request header 에서 host 정보 가져오기
    res.render('index.ejs', {
        host,
        urls
    })
})

app.get('/new', (req, res) => {
	const host = req.get('host')
	if(req.query.secret === process.env.SECRET) {
		res.render('new.ejs', {secret: process.env.SECRET})
	} else {
		res.status(403) // none-authorized user
		res.send('403 not permitted')
	}
})

app.get('/:slug', (req, res) => {
    const urlItem = urls.find(item => item.slug === req.params.slug)
    if (urlItem) {
        res.redirect(301, urlItem.longUrl)
    } else {
        res.status(404)
        res.send('404 not found')
    }
})

app.post('/new', (req, res) => {
	if(req.body.secret === process.env.SECRET) {
		const urlItem = {
			longUrl: req.body.longUrl,
			slug: randomstring.generate(8)
		}	
		urls.push(urlItem)
		res.redirect('/')
	} else {
		res.status(403) // none-authorized user
		res.send('403 not permitted')
	}
})

app.listen(3000, () => {
    console.log('listening....')
})