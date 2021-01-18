/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

function getRandomItem(array) {
    return array[Math.floor(Math.random()*array.length)]
}

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

const CHEERS = [
    "Hi.",
    "Good.",
    "Aloha.",
    "What's up?",
    "How are you?",
    "Hello, how are you?",
    "Hi! I'm glad to hear from you.",
    "Hi! Nice to hear from you again.",
    "Hello! How nice that you are here!"
];

const CURIOSIDADES = [
    "Pacman nació una noche que su creador, Tohru Iwatani, salió a cenar con sus amigos. Pidieron pizza, y la idea del personaje se le vino a la cabeza al ver la figura que quedaba al coger la primera porción.",
    "El Polybius es el juego arcade más misterioso de todos los tiempos y no se conserva ni una sola copia del mismo. Según cuenta la leyenda, este puzzle que apareció en unos pocos sitios de Portland (Oregón), y era un experimento del gobierno de EEUU capaz de causar pesadillas y pérdidas de memoria.",
    "El mejor jugador del mundo de Pacman se llama Billy Mitchel y consiguió en el juego una puntuación de 3.333.360 puntos llegando al nivel 255 (penúltimo nivel) con la primera vida y comiendo cada una de las frutas.",
    "El primer trabajo de Mario Bros fue de carpintero en el Donkey Kong y no de fontanero. Entonces no se llamaba Mario sino Jumpman.",
    "El que los enemigos acelerasen en el Space Invaders original de 1971, fue un error de programación o bug que se quiso mantener. Parece que no existía el concepto de dificultad entre los niveles.",
    "Final Fantasy (la última fantasia) se llamo asi por el hecho de que el creador y co-fundador de Square, Hironobu Sakaguchi, uso la última cantidad de dinero que le quedaba a la compañía.",
    "La protagonista de Tomb Raider, Lara Croft, originalmente se iba a llamar Laura Cruz.",
    "Si se llevaran los mapas de la serie Grand Theft Auto a la vida real y se construyeran las ciudades, las dimensiones de la ciudad en GTA: San Andreas sería de 44 Km cuadrados. Eso comparado con otras ciudades del mismo juego, es mas o menos 5 veces, el tamaño de Liberty City, y 4 veces el tamaño.",
    "Un videojuego de 1987 sobre Jack el Destripador fue el primer juego de la historia en recibir la clasificación para mayores de 18 años, debido a sus violentas imágenes.",
    "A partir del nivel 18, los fantasmitas en Pacman ya no se dejan comer ni tampoco titilan en azul.",
    "Mortal Kombat fue el videojuego que llevó a crear la ESRB, la organización que clasifica los videojuegos en función de edad y violencia en Estados Unidos. Desde este videojuego en adelante se hizo publico que la industria pasó de ser simple juego de niños a entretenimiento para adultos.",
    "El Breakout (también conocido como Arkanoid) nació como una versión del PONG para un sólo jugador. Al Alcorn, ingenierio de Atari y creador del Pong, había diseñado un prototipo que usaba demasiados chips para mover el juego, por lo que resultaba inviable como producto comercial sacar algo así.",
    "Cada uno de los mas de 700 carros de Gran Turismo 4, le costó un mes a los diseñadores modelarlo con todos sus detalles. ¿Cuántos diseñadores durante cuánto tiempo hicieron este trabajo?",
    "La maquina de ARCADE mas grande del mundo: mide 4.11 metros y tiene una pantalla 1.87 metros y se pueden jugar mas de 150 juegos en ella.",
    "Pacman fue el primer juego que tuvo personaje central.",
    "La mayor recaudación de la historia en un solo día por la venta de un videojuego fue con la venta de Call of Duty: Moder Warfare 2, consiguiendo 410 millones de dólares en su primer día de salida y le sigue Grand Theft Auto con 300 millones de dólares.",
    "El juego de The Guy Game para PS2 y Xbox, tuvo que ser retirado de las tiendas luego de que se descubriera que una de las chicas era menor de edad al publicarse el juego.",
    "Xbox originalmente se iba a llamar DirectX-box por su uso de la tecnología Direct X que funcionaba originalmente en Windows y que sirvió como base para manejar la plataforma gráfica y de desarrollo de la consola.",
    "El primer videojuego de disparos de la historia se creó en 1961. Se llama Spacewar! y se realizó en tan solo 200 horas.",
    "El primer Easter Egg o regalo escondido encontrado en un videojuego, se considera que fue en 'Adventure' de Atari 2600, y consistia en una habitacion donde se podia ver el nombre del creador del juego.",
    "Halo 2 es el juego de Xbox mas vendido, vendió 8 millones de copias. Su competidor mas directo es el primer Halo, con 5 millones.",
    "El equipo responsable de hacer la translación o port de Resident Evil 2 para la Nintendo 64, es ahora Rockstar San Diego.",
    "Steve Downes, el hombre que da voz al protagonista de la serie de Halo, Master Chief (en inglés), trabaja en una emisora de radio en Chicago.",
    "Durante la creación de Forza Motorsport 2 para la Xbox 360, el equipo creativo de Turn10 tuvo 41 multas por infracciones, y se cancelaron temporalmente dos licencias de conducir.",
    "La mayor guerra de bombas de agua de la historia la organizó Microsoft en Australia con el fin de promocionar la consola Xbox 360. En tal evento se lanzaron más de 51 mil globos con agua."
];

const CURIOSITIES = [
    "Pacman was born one night that his creator, Tohru Iwatani, went out to dinner with his friends. They ordered pizza, and the idea of ​​the character came to his head when he saw the figure that was left when he took the first portion.",
    "Polybius is the most mysterious arcade game of all time and not a single copy of it is preserved. According to legend, this puzzle that appeared in a few places in Portland (Oregon), and was an experiment of the government of USA capable of causing nightmares and memory loss. ",
    "The best Pacman player in the world is named Billy Mitchel and he scored 3,333,360 points in the game, reaching level 255 (second to last level) with the first life and eating each of the fruits.",
    "Mario Bros first job was as a carpenter at Donkey Kong and not as a plumber. Then his name was not Mario but Jumpman.",
    "The fact that the enemies accelerated in the original Space Invaders from 1971, was a programming error or bug that they wanted to keep. It seems that the concept of difficulty between the levels did not exist.",
    "Final Fantasy (the last fantasy) was named for the fact that Square creator and co-founder Hironobu Sakaguchi used the last amount of money the company had left.",
    "Tomb Raider protagonist Lara Croft was originally going to be named Laura Cruz.",
    "If the maps of the Grand Theft Auto series were brought to real life and cities were built, the dimensions of the city in GTA: San Andreas would be 44 square km. That compared to other cities in the same game, is more or minus 5 times the size of Liberty City, and 4 times the size. ",
    "A 1987 video game about Jack the Ripper was the first game in history to be rated 18+ due to its violent imagery.",
    "Starting at level 18, the ghosts in Pacman can no longer be eaten or blink blue.",
    "Mortal Kombat was the video game that led to the creation of the ESRB, the organization that classifies video games based on age and violence in the United States. From this video game onwards, it was made public that the industry went from being simple child's play to entertainment for Adults.",
    "The Breakout (also known as Arkanoid) was born as a single player version of PONG. Al Alcorn, Atari engineer and creator of Pong, had designed a prototype that used too many chips to move the game, making it unfeasible as a commercial product get something like that. ",
    "Each one of the more than 700 cars of Gran Turismo 4, it took the designers a month to model it with all its details. How many designers for how long did this work?",
    "The largest ARCADE machine in the world: it measures 4.11 meters and has a 1.87 meter screen and more than 150 games can be played on it.",
    "Pacman was the first game to have a central character.",
    "The highest grossing in history in a single day from the sale of a video game was with the sale of Call of Duty: Moder Warfare 2, raising 410 million dollars on its first day of release and is followed by Grand Theft Auto with 300 million of dollars.",
    "The Guy Game for PS2 and Xbox had to be withdrawn from stores after it was discovered that one of the girls was underage when the game was published.",
    "Xbox was originally going to be called DirectX-box because of its use of Direct X technology that originally worked on Windows and served as the basis for handling the console's graphics and development platform.",
    "The first shooter video game in history was created in 1961. It's called Spacewar! And it took just 200 hours to make.",
    "The first Easter Egg or hidden gift found in a video game, is considered to have been in Atari 2600's 'Adventure', and consisted of a room where the name of the creator of the game could be seen.",
    "Halo 2 is the best-selling Xbox game, it sold 8 million copies. Its most direct competitor is the first Halo, with 5 million.",
    "The team responsible for porting Resident Evil 2 to the Nintendo 64 is now Rockstar San Diego.",
    "Steve Downes, the man who voices the protagonist of the Halo series, Master Chief, works at a radio station in Chicago.",
    "During the creation of Forza Motorsport 2 for the Xbox 360, the creative team at Turn10 had 41 fines for violations, and two driver's licenses were temporarily canceled.",
    "The largest water bomb war in history was organized by Microsoft in Australia to promote the Xbox 360 console. More than 51 thousand water balloons were launched at this event."
];

const  PREGUNTAS = [
    "¿Quieres otra?",
    "¿Quieres otra curiosidad?",
    "¿Quieres saber la siguiente?",
    "¿Quieres saber la siguiente curiosidad?",
    "¿Quieres saber otra?",
    "¿Quieres saber otra curiosidad?",
    "¿Quieres saber una nueva?",
    "¿Quieres saber una nueva curiosidad?",
    "¿Quieres una nueva?",
    "¿Quieres una nueva curiosidad?",
    "¿Te digo otra?",
    "¿Te digo otra curiosidad?",
    "¿Te digo la siguiente?",
    "¿Te digo la siguiente curiosidad?",
    "¿Te gustaría saber más?",
    "¿Te gustaría saber más curiosidades?",
    "¿Te gustaría saber otra?",
    "¿Te gustaría saber otra curiosidad?",
    "¿Otra?",
    "¿Otra curiosidad?",
    "¿Una más?",
    "¿Una curiosidad más?"
];

const  QUESTIONS = [
    "Do you want another?",
    "Do you want another curiosity?",
    "Do you want to know the next one?",
    "Do you want to know the following curiosity?",
    "Do you want to know another?",
    "Do you want to know another curiosity?",
    "Do you want to know a new one?",
    "Do you want to know a new curiosity?",
    "Do you want a new one?",
    "Do you want a new curiosity?",
    "Shall I tell you another?",
    "Shall I tell you another curiosity?",
    "Shall I tell you the next one?",
    "Shall I tell you the following curiosity?",
    "Would you like to know more?",
    "Would you like to know more curiosities?",
    "Would you like to know another one?",
    "Would you like to know another curiosity?",
    "Other?",
    "Another curiosity?",
    "One more?",
    "One more curiosity?",
];

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        let speakOutput = '';
        if(handlerInput.requestEnvelope.request.locale == 'es-ES'){
            speakOutput += 'Bienvenido a curiosidades de videojuegos. ¿Te gustaría saber alguna curiosidad?';
        }else{
            speakOutput += 'Welcome to videogame curiosities. Would you like to know any curiosity?';
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const GetNewFactIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetNewFactIntent';
    },
    handle(handlerInput) {
        let speakOutput = '';
        if(handlerInput.requestEnvelope.request.locale == 'es-ES'){
            speakOutput += getRandomItem(CURIOSIDADES) + ' ' + getRandomItem(PREGUNTAS);
        }else{
            speakOutput += getRandomItem(CURIOSITIES) + ' ' + getRandomItem(QUESTIONS);
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
        let speakOutput = '';
        if(handlerInput.requestEnvelope.request.locale == 'es-ES'){
            speakOutput += 'Puedes pedirme que te diga una curiosidad para contarte alguna.';
        }else{
            speakOutput += 'You can ask me to tell you a curiosity to tell you some.';
        }
        
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
        let speakOutput = '';
        if(handlerInput.requestEnvelope.request.locale == 'es-ES'){
            speakOutput += 'Hasta la próxima.';
        }else{
            speakOutput += 'Bye bye.';
        }

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
        let speakOutput = '';
        if(handlerInput.requestEnvelope.request.locale == 'es-ES'){
            speakOutput += 'Lo siento, no te he entendido, intentalo de nuevo.';
        }else{
            speakOutput += 'Sorry, I didn\'t understand you, try again.';
        }

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
        let speakOutput = '';
        if(handlerInput.requestEnvelope.request.locale == 'es-ES'){
            speakOutput += 'Lo siento, no te he entendido, intentalo de nuevo.';
        }else{
            speakOutput += 'Sorry, I didn\'t understand you, try again.';
        }
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
        GetNewFactIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();