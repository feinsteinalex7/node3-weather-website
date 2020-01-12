const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/8ff5ea9af0512e389efc666b6a088321/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '?lang=en';
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            const {temperature, precipProbability, windSpeed} = body.currently;
            const data = `${body.daily.data[0].summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain. Wind speed is ${windSpeed}.`;
            callback(undefined, data);
        }    
    });
}

module.exports = forecast;