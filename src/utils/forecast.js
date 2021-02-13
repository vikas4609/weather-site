const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
	const url = 'http://api.weatherstack.com/current?access_key=881e55cf0c39467644c5ad3f4a6e3884&query=' + latitude + ',' + longitude

	request({url: url, json:true}, (error, response) => {
		if(error) {
			callback('unable to connect api', undefined)
		}
		else if(response.body.error){
			callback('unable to fetch location. try again', undefined)
		}
		else {
			callback(undefined, response.body.current.weather_descriptions[0] + '.There is ' + response.body.current.temperature + ' degree temperature. It feels like ' + response.body.current.feelslike + ' degrees out there. The chances of rain is ' + response.body.current.precip + '% and humidity is ' + response.body.current.humidity + '%.')
		}
	})
}

module.exports = forecast