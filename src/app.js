const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
	res.render('index',{
		title: 'weather',
		name: 'vikas'
	})
})

app.get('/about',(req, res) => {
	res.render('about',{
		'title': 'about',
		'name': 'vikas'
	})
})

app.get('/help',(req,res)=>{
	res.render('help',{
		title:'help',
		msg:'help everyone',
		name: 'vikas'
	})
})


app.get('/weather',(req,res) => {

	if(!req.query.address)
	{
		return res.send({
			error : 'you must provide an address'
		})
	}

	geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
		if(error){
			return res.send({error})
		}
		forecast(latitude,longitude,(error, forecastData) => {
			if(error) {
				return res.send({error})
			}
			
			res.send({
				forecast: forecastData,
				location: location,
				address: req.query.address
			})
		})
	})

	
})

app.get('/help/*',(req,res)=>{
	res.render('404',{
		errorMsg:'help article not found',
		name: 'vikas',
		title: '404'
	})
})

app.get('*',(req,res)=>{
	res.render('404',{
		errorMsg:'page not found',
		name: 'vikas',
		title: '404'
	})
})

app.listen(port, ()=>{
	console.log('server listening on port ' + port )
})