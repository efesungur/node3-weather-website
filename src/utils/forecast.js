const request = require('postman-request')

const forecast = (latitude, longtitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=2394f4bdd202b580b79599a982e96882&query=${latitude},${longtitude}&units=m`

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else {
            const _ = response.body
            if (_.error) {
               callback(_.error.info, undefined)
            } else {
               callback(undefined, {
                   description: _.current.weather_descriptions[0],
                   location : _.location.name + '/' + _.location.region + '/' + _.location.country,
                   temperature: _.current.temperature,
                   unit: _.request.unit,
                   icon: _.current.weather_icons[0]
               })
            }
        }
    })
}

module.exports = forecast