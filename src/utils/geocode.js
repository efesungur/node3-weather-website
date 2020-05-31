const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmlrbzkyIiwiYSI6ImNrYWxva3RxZzB3bHcyenBpemxsdHUwaW0ifQ.RzNkNPrllRWXFWfQ7QqARQ&limit=5`

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else {
            const _ = response.body
            if(_.features.length === 0) {
                callback('Unable to find location. Try another search', undefined)
            } else {
                var o = {}
                var key = 'features'
                o[key] = []

                _.features.forEach(feature => {
                    var data = {
                        longtitude: feature.center[0],
                        latitude: feature.center[1],
                        location: feature.place_name
                    }

                    o[key].push(data)
                });

                callback(undefined, o)
            }
        }

    })
}

module.exports = geocode