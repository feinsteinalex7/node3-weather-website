const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Alex Feinstein'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        });
    } 

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                'error': error
            });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    'error': error
                });
            }
            res.send({
                'location': location,
                'forecastData': forecastData,
                'address': req.query.address
            });
        });
    });
});


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        });
    } 

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "The Help Page",
        text: "Whademigunnado???",
        name: 'Alex Feinstein'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Alex Feinstein'
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        name: "Alex Feinstein",
        error: "Help article not found!"
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        name: "Alex Feinstein",
        error: "Page not found!"
    });
});

app.listen(port, () => {
    console.log("Server is up on port " + port);
});