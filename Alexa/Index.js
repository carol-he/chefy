'use strict';


var priceList ={};
var chefList = {};

function getNearByChoices(session)
{
    
    
    var result = [
        {"chef name": "Mun","food name": "Tomato Pasta","picture": "www.link.com","price": "6","description": "So good. Probably the best food in the world."}
        ,{"chef name": "Simon","food name": "Vegetable Samosa","picture": "www.link.com","price": "4","description": "So good. Probably the best food in the world."}
        ,{"chef name": "Simon","food name": "Brownie","picture": "www.link.com","price": "5","description": "So good. Probably the best food in the world."}
        ,{"chef name": "Mun","food name": "Chicken Sandwich","picture": "www.link.com","price": "5","description": "So good. Probably the best food in the world."}
        
        ];
        
        
    let curFood = ''
    let curPrice = ''
    let curChef = ''
    result.forEach(function(value)
    {
        for(var key in value)
        { 
            if(key === "food name")
            {
                curFood = value[key].toUpperCase();
            }
            else if(key === "price")
            {
                curPrice = value[key].toUpperCase();
            }
            else if(key === 'chef name')
            {
                curChef = value[key].toUpperCase();
            }
            if(curFood !== '' && curPrice !== '')
            {
                priceList[curFood] = curPrice;
            }
            if(curFood !== '' && curChef !== '')
            {
                chefList[curFood] = curChef;
            }
        
        }
    })
}


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) 
{
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output,
        },
        card: {
            type: 'Simple',
            title: `SessionSpeechlet - ${title}`,
            content: `SessionSpeechlet - ${output}`,
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText,
            },
        },
        shouldEndSession,
    };
}

function buildResponse(sessionAttributes, speechletResponse) 
{
    return {
        version: '1.0',
        sessionAttributes,
        response: speechletResponse,
    };
}

function getWelcomeResponse(callback) 
{
    const sessionAttributes = {};
    const cardTitle = 'Welcome';
    // const speechOutput = 'Welcome to HackNY 2017. This is a demo version of our new app, FooBar. ' +
    //                     'Would you like to purchase food?';
    const speechOutput = 'Welcome to our demo of Chefy. Would you like to purchase food?';
 
    const repromptText = 'Would you like to purchase food?. ';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function handleSessionEndRequest(callback) 
{
    const cardTitle = 'Session Ended';
    const speechOutput = 'By the way, I think this group deserves A plus in this class. Thank you for trying the demo. ';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

function confirmOrderResponse(callback) 
{
    const cardTitle = 'Session Ended';
    const speechOutput = 'Order confirmed! By the way, I think this group deserves A plus in this class. Thank you for trying the demo.';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

function getPreferenceResponse(callback) 
{
    const sessionAttributes = {};
    const cardTitle = 'Pref';
    const speechOutput = 'Would you like to change your preference setting? ';
 
    const repromptText = 'Would you like to change preference? ';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getDistanceResponse(callback) 
{
    const sessionAttributes = {};
    const cardTitle = 'Distance';
    const speechOutput = 'Within what miles do you want your chef to be located at?';
 
    const repromptText = 'Please describe the distance limit. ';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function setPreferenceResponse(callback) 
{
    const sessionAttributes = {};
    const cardTitle = 'Pref';
    const speechOutput = 'No changes made.';
 
    const repromptText = 'No changes made ';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}


function getTimeResponse(callback) 
{
    const sessionAttributes = {};
    const cardTitle = 'Distance';
    const speechOutput = 'Within how many hours do you want your food to be made?';
 
    const repromptText = 'Please describe the time preference. ';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}


function createDistanceAttributes(distance) {
    return {
        distance,
    };
}

function setDistanceTag(intent, session, callback) 
{
    const cardTitle = intent.name;
    const distanceKeyWordSlot = intent.slots.distance;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';

    if (distanceKeyWordSlot) {
        const distance = distanceKeyWordSlot.value;
        sessionAttributes = createDistanceAttributes(distance);
        speechOutput = `Within what time do you want your food to be made?`;
    } else {
        speechOutput = "Could you describe your distance preference again? ";
        
    }

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function createTimeAttributes(time) {
    return {
        time,
    };
}

function confirmPreference(callback)
{
    const sessionAttributes = {};
    const cardTitle = 'Preference';
    // const speechOutput = 'Welcome to HackNY 2017. This is a demo version of our new app, FooBar. ' +
    //                     'Would you like to purchase food?';
    const speechOutput = 'Currently set to 2 miles and 1 hour';
 
    const repromptText = 'Would you like to see the menu? ';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function setTimeTag(intent, session, callback) 
{
    const cardTitle = intent.name;
    const timeKeyWordSlot = intent.slots.time;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';

    if (timeKeyWordSlot) {
        const time = timeKeyWordSlot.value;
        sessionAttributes = createTimeAttributes(time);
        var distance = session.attributes.distance;
        speechOutput = `Updated to ${distance} miles and ${time} hours.`;
    } else {
        speechOutput = "Currently set to 2 miles and 1 hour. ";
        
    }

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}





    
    

function getMenu(intent, session, callback) 
{
    const cardTitle = intent.name;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';

    
    getNearByChoices(session);
    for(var key in priceList)
    {
        speechOutput += key.toLowerCase();
        speechOutput += ','
    }
    speechOutput += ' are currently available.';

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
    
}


function createChoiceAttributes(choice) {
    return {
        choice,
    };
}

function pickMenu(intent, session, callback)
{

    const cardTitle = intent.name;
    const choiceKeyWordSlot = intent.slots.choice;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';
    
    //getNearByChoices(session);
    
    if (choiceKeyWordSlot) {
        const choice = choiceKeyWordSlot.value;
        sessionAttributes = createChoiceAttributes(choice);
        let price = priceList[choice.toString().toUpperCase()];
        speechOutput = `Ordering ${choice} that costs ` + price + ` dollars. Confirm?`;
    } else {
        speechOutput = "Please describe your choice again";
        
    }

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
    
}


function onSessionStarted(sessionStartedRequest, session) 
{
    console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
}


function onLaunch(launchRequest, session, callback) 
{
    console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);


    getWelcomeResponse(callback);
}


function onIntent(intentRequest, session, callback) 
{
    console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;

    if (intentName === 'YesIntent')
    {
        getPreferenceResponse(callback);
    }
    else if(intentName === 'NoIntent')
    {
        handleSessionEndRequest(callback);
    }
    else if(intentName === 'PreferenceYesIntent')
    {
        getDistanceResponse(callback);
    }
    else if(intentName === 'PreferenceIntent')
    {
         setPreferenceResponse(callback);
    }
    else if (intentName === 'DistanceIntent') 
    {
        setDistanceTag(intent, session, callback);
    }
    else if(intentName ===  'TimeIntent')
    {
        setTimeTag(intent, session, callback);
    }
    else if (intentName === 'GetMenuIntent') 
    {
        getMenu(intent, session, callback);
    } 
    else if (intentName === 'PickMenuIntent')
    {
        pickMenu(intent, session, callback);
    }
    else if (intentName == 'RepeatIntent')
    {
        getMenu(intent, session, callback);
    }
    else if (intentName === 'ConfirmIntent')
    {
        confirmOrderResponse(callback);
    }
    else if (intentName === 'AMAZON.HelpIntent') 
    {
        getWelcomeResponse(callback);
    } 
    else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent' || intentName === 'EndIntent') 
    {
        handleSessionEndRequest(callback);
    }
    else 
    {
        throw new Error('Invalid intent');
    }
}


function onSessionEnded(sessionEndedRequest, session) 
{
    console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
}


exports.handler = (event, context, callback) => 
{
    try {
        console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

        if (event.session.new) {
            onSessionStarted({ requestId: event.request.requestId }, event.session);
        }

        if (event.request.type === 'LaunchRequest') 
        {
            onLaunch(event.request,event.session,
                (sessionAttributes, speechletResponse) => 
                {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } 
        else if (event.request.type === 'IntentRequest') 
        {
            onIntent(event.request,event.session,
                (sessionAttributes, speechletResponse) => 
                {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } 
        else if (event.request.type === 'SessionEndedRequest') 
        {
            onSessionEnded(event.request, event.session);
            callback();
        }
    } 
    catch (err) 
    {
        callback(err);
    }
};

