module.exports = {
    LaunchRequestHandler : {
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
    },
    
    SearchToHandler : {
        canHandle(handlerInput) {
            return ( handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
                     handlerInput.requestEnvelope.request.intent.name === 'flightsto');
        },
        handle(handlerInput) {
            const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
            const locationSlot = handlerInput.requestEnvelope.request.intent.slots.location;
            const speechText = 'You asked for flights to ' + locationSlot.value;
            const repromptText = 'Need to know anything else about flights to ' + locationSlot.value + '?';
    
            sessionAttributes.locationOutput = locationSlot.value;
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(repromptText)
                .getResponse();
        }
    },
    
    FlightDatesHandlerHandler : {
        canHandle(handlerInput) {
            return ( handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
                     handlerInput.requestEnvelope.request.intent.name === 'flightdates');
        },
        handle(handlerInput) {
            const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
            const speechText = 'There are flights to ' + sessionAttributes.locationOutput + ' on the 23rd of August.';
    
            const repromptText = 'Need to know anything else about flights?';
    
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(repromptText)
                .getResponse();
        }
    },
    
    FallBackHandler : {
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
    }
}