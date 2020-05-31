const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmlrbzkyIiwiYSI6ImNrYWxva3RxZzB3bHcyenBpemxsdHUwaW0ifQ.RzNkNPrllRWXFWfQ7QqARQ&limit=1`

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else {
            const _ = response.body
            if(_.features.length === 0) {
                callback('Unable to find location. Try another search', undefined)
            } else {
                callback(undefined, {
                    longtitude: _.features[0].center[0],
                    latitude: _.features[0].center[1],
                    location: _.features[0].place_name
                })
            }
        }

    })
}

module.exports = geocode