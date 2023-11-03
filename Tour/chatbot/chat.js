var cogBotAPITypes = require('./cogBotAPITypes.js').cogBotAPITypes;
var cogAPIData = new cogBotAPITypes(); 

function sendRequestToApi(message){
    return fetch(cogAPIData.CogbotURL,
    {
      method: cogAPIData.POSTstr,
      headers: {
        'Content-Type': cogAPIData.hdrContentValue,
		     'Accept': cogAPIData.hdrAcceptValue,
        'Authorization': cogAPIData.hrdAuthValue,
      },
      body: JSON.stringify(
        {
            "input" : {"text" : message}
        }
      ),
    })
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch(error => console.warn(error));
}


//example of how to communicate with the chat bot 
sendRequestToApi("hello").then((response) => {
        console.log(response.output.generic[0].text);
        }
    )


