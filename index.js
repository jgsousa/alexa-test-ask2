const Alexa = require('ask-sdk');
let skill;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8080;

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

const SearchToHandler = {
    canHandle(handlerInput) {
        return ( handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
                 handlerInput.requestEnvelope.request.intent.name === 'flightsto');
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const locationSlot = handlerInput.requestEnvelope.request.intent.slots.location;
        const speechText = 'You asked for flights to ' + locationSlot.value;

        sessionAttributes.locationOutput = locationSlot.value;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const FallBackHandler = {
    canHandle(handlerInput) {
        return ( handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
                 handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent');
    },
    handle(handlerInput) {
        const speechText = 'Sorry, I don\'t understand your request';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

app.use(bodyParser.json());
app.post('/test', function(req, res) {

if (!skill) {

    skill = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        SearchToHandler,
        FallBackHandler
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