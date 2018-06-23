const Alexa = require('ask-sdk');
let skill;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'T. A. P. welcomes you!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

app.use(bodyParser.json());
app.post('/', function(req, res) {

if (!skill) {

    skill = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler
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

app.listen(3000, function () {
    console.log('Development endpoint listening on port 3000!');
});