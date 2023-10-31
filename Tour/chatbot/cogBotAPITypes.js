class cogBotAPITypes{

    constructor(){
        console.log("cogbotTypeCreated")
    }
    hdrContentKey = 'Content-Type';
    hdrAcceptKey = 'Accept';
    hrdAuthKey = 'Authorization';
    CogbotURL = 'https://cca2.uf-cap1.cogability.net/api/cogbots/alberta/id/fianavickers/message';
    hdrContentValue = 'application/json';
    hdrAcceptValue = 'application/json';
    hrdAuthValue = 'Basic dWZjYXAxNi1lYzY3LTMyOWUtYmI1Ni05Yjk2NWVkOTA0ejU6WHlmdXBhYzFhekViTmRZVlA4';
    POSTstr = "POST";
}
module.exports = {cogBotAPITypes}

