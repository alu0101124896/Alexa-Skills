/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const baseDeDatos = require('./data-base');

let adivinando = null;
let adivinanzaActual = null;
let segundaOportunidad = null;

const SALUDOS = [
    "Hola.",
    "Buenas.",
    "Aloha.",
    "¿Qué hay?",
    "¿Qué tal?",
    "Hola, ¿qué tal?",
    "¡Hola! Me alegra escucharte.",
    "¡Hola! Da gusto escucharte de nuevo.",
    "¡Hola! ¡Qué bien que estés aquí!"
];

const OTRA_ADIVINANZA = [
    "¿Quieres otra?",
    "¿Quieres otra adivinanza?",
    "¿Quieres una nueva?",
    "¿Quieres una nueva adivinanza?",
    "¿Te digo otra?",
    "¿Te digo otra adivinanza?",
    "¿Te digo la siguiente?",
    "¿Te digo la siguiente adivinanza?",
    "¿Otra?",
    "¿Otra adivinanza?",
    "¿Una más?",
    "¿Una adivinanza más?"
];

function getRandomItem(array) {
    return array[Math.floor(Math.random()*array.length)]
}

function adivinanzaAleatoria(obj) {
    if (Object.keys(obj).length === 0){
        return null;
    }
    return obj[Object.keys(obj)[Math.floor(Math.random()*Object.keys(obj).length)]];
}

function nuevaAdivinanza() {
    adivinanzaActual = adivinanzaAleatoria(baseDeDatos);
    segundaOportunidad = true;
    adivinando = true;
    return adivinanzaActual.adivinanza;
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = getRandomItem(SALUDOS) + ' Hoy vamos a jugar a ¡Adivina el musculo!, a continuación te formularé la adivinanza y tu deberás contestar, en caso de fallar te daré una pista. ' + nuevaAdivinanza();

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const AnswerIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AnswerIntent';
    },
    handle(handlerInput) {
        const respuesta = handlerInput.requestEnvelope.request.intent.slots.solucion.value;
        
        let speakOutput = '';
        if(adivinando){
            if (respuesta == adivinanzaActual.solucion){
                speakOutput += '¡Correcto! ' + adivinanzaActual.respuesta + '. ' + getRandomItem(OTRA_ADIVINANZA);
                adivinando = false;
            } else if (segundaOportunidad == true) {
                speakOutput += 'Incorrecto. Te voy a dar una pista, ' + adivinanzaActual.pista;
                segundaOportunidad = false;
            } else {
                speakOutput += 'Incorrecto. ' + adivinanzaActual.respuesta + ' ' + getRandomItem(OTRA_ADIVINANZA);
                adivinando = false;
            }
        }else{
            speakOutput += 'Responde si o no.'
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const RepeatIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput) {
        let speakOutput = '';
        if(adivinando){
            speakOutput += adivinanzaActual.pregunta;
        } else {
            speakOutput += getRandomItem(OTRA_ADIVINANZA);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const NextIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NextIntent';
    },
    handle(handlerInput) {
        const speakOutput = nuevaAdivinanza();

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const YesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent';
    },
    handle(handlerInput) {
        let speakOutput = '';
        if(adivinando){
            speakOutput += 'Disculpa, no he entendido lo que has dicho, vuelve a probar.';
        } else {
            speakOutput += nuevaAdivinanza();
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'El juego consiste en una serie de adivinanzas relacionadas con los músculos del cuerpo humano.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = '¡Hasta la próxima!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Disculpa, no he entendido lo que has dicho, vuelve a probar.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Disculpa, no he entendido lo que has dicho, vuelve a probar.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        AnswerIntentHandler,
        RepeatIntentHandler,
        NextIntentHandler,
        YesIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();