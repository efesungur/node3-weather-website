const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Efe Sungur'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Efe Sungur'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help Page',
        title: 'Help',
        name: 'Efe Sungur'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address value'
        })
    }

    geocode(req.query.address, (error, geocodeObject = {}) => {
        if(error) {
            return res.send({ error })
        }

        console.log(geocodeObject)

        var key = Object.keys(geocodeObject)[0] // first and only key of the object. This is a json array

        forecast(geocodeObject[key][0].latitude, geocodeObject[key][0].longtitude, (error, {description, location, temperature, unit, icon}) => {
            if(error) {
                console.log(error)
                return res.send({ error })
            }

            console.log(`description: ${description}, location: ${location}, temperature: ${temperature}, unit: ${unit}`)

            res.send({
                description: description,
                location: location,
                temperature: temperature,
                unit: unit,
                icon: icon
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Efe Sungur',
        errorMessage: 'Help is not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Efe Sungur',
        errorMessage: 'Page is not found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})