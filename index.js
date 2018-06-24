const Alexa = require('ask-sdk');
const Handlers = require('./handlers.js');
let skill;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.post('/test', function(req, res) {

if (!skill) {

    skill = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        Handlers.LaunchRequestHandler,
        Handlers.SearchToHandler,
        Handlers.FallBackHandler,
        Handlers.FlightDatesHandlerHandler
    )
    .create();

}

skill.invoke(req.body)
    .then(function(responseBody) {
        res.json(responseBody);
    })
    .catch(function(error) {
        console.log(error);
        res.status(500).send('Error during the request');
    });

});

app.listen(PORT, function () {
    console.log('Development endpoint listening on port ' + PORT + '!');
});