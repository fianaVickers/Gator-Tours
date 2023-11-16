package com.example.alligatorstours.chatbot.cca2client;

import android.os.Build;

import androidx.annotation.RequiresApi;

import com.example.alligatorstours.chatbot.cca2client.types.*;
import com.example.alligatorstours.chatbot.cca2client.types.GenericResponse;
import com.example.alligatorstours.chatbot.cca2client.types.InitResponse;
import com.example.alligatorstours.chatbot.cca2client.types.MessageContext;
import com.example.alligatorstours.chatbot.cca2client.types.MessageContextGlobal;
import com.example.alligatorstours.chatbot.cca2client.types.MessageContextGlobalSystem;
import com.example.alligatorstours.chatbot.cca2client.types.MessageInput;
import com.example.alligatorstours.chatbot.cca2client.types.MessageInputOptions;
import com.example.alligatorstours.chatbot.cca2client.types.MessageRequest;
import com.example.alligatorstours.chatbot.cca2client.types.MessageResponse;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.*;
import java.util.stream.Collectors;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLPeerUnverifiedException;

public class CCA2Client {

    private static final String USER_ID = "userId";
    private static final String COGBOT_ID = "COGBOT_ID";
    private String cca2Auth;
    private String cogbotId;
    private URL messageApiUrl;
    private String language;
    private String country;
    private String userId = null;

    public CCA2Client(String cca2ContextPath, String cca2Auth, String cogbotId, String language, String country) throws MalformedURLException {
        this.cca2Auth = cca2Auth;
        this.cogbotId = cogbotId;
        this.language = language;
        this.country = country;

        String initApiUrl = cca2ContextPath + "api/init/cogbots/%s"; // "api/init/cogbots/{cogbot_id}";
        URL initURL = new URL(String.format(initApiUrl, cogbotId));

        try {

            HttpsURLConnection conn = (HttpsURLConnection) initURL.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            // more header set up here??? cca2Auth???
            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
            }

            Reader reader = new InputStreamReader(conn.getInputStream(), "UTF-8");
            InitResponse initResponse = new Gson().fromJson(reader, InitResponse.class);

            conn.disconnect();
            userId = (String) initResponse.get(USER_ID);
            if (userId == null || userId.isEmpty()) {
                userId = UUID.randomUUID().toString();

            }
        } catch (SSLPeerUnverifiedException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        messageApiUrl = new URL(String.format("%sapi/cogbots/%s/id/%s/message", cca2ContextPath, cogbotId, userId));// "api/cogbots/{cogbot_id}/id/{id}/message";
    }

    // helper function
    @RequiresApi(api = Build.VERSION_CODES.N)
    public List<List<String>> callMessageApi(String text) throws MalformedURLException {
        MessageResponse messageResponse = callMessageApi(buildMessageRequest(text));

        return transformResponse(messageResponse);
    }

    public MessageResponse callMessageApi(MessageRequest messageRequest) throws MalformedURLException {
        return callPost(new Gson().toJson(messageRequest));
    }

    private MessageResponse callPost(String jsonToSend) {
        try {

            HttpURLConnection conn = (HttpURLConnection) messageApiUrl.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Authorization", "Basic " + cca2Auth);

            OutputStream os = conn.getOutputStream();
            os.write(jsonToSend.getBytes());
            os.flush();

            if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
                throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
            }

            Reader reader = new InputStreamReader(conn.getInputStream(), "UTF-8");
            MessageResponse response = new Gson().fromJson(reader, MessageResponse.class);
            conn.disconnect();
            return response;
        } catch (IOException e) {
            e.printStackTrace();

        }
        return null;
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    List<List<String>> transformResponse(MessageResponse response) {

        return response.getOutput().getGeneric().stream().map(message -> {
            if (GenericResponse.ResponseType.TEXT.equalsIgnoreCase(message.getResponseType()) && "write".equalsIgnoreCase(message.getOutputType())) {
                return Collections.singletonList(message.getText());
            } else if (GenericResponse.ResponseType.SEARCH.equalsIgnoreCase(message.getResponseType())) {
                return message.getResults().stream().map(searchResult -> searchResult.getOverview()).collect(Collectors.toList());
            } else if (GenericResponse.ResponseType.OPTION.equalsIgnoreCase(message.getResponseType()) && "write".equalsIgnoreCase(message.getOutputType())) {
                return message.getOptions().stream().map(elm -> elm.getValue().getInput().getText()).collect(Collectors.toList());
            } else if (message.getOutputType() == null) {
                return Collections.singletonList(message.getText());
            } else {
                return Collections.singletonList("Nothing found!");
            }
        }).collect(Collectors.toList());
    }

    MessageRequest buildMessageRequest(String text) {

        MessageInputOptions messageInputOptions = new MessageInputOptions();
        messageInputOptions.setAlternateIntents(true);

        MessageInput messageInput = new MessageInput();

        messageInput.setMessageType(MessageInput.MessageType.TEXT);
        messageInput.setText(text);
        messageInput.setOptions(messageInputOptions);

        MessageContextGlobalSystem messageContextGlobalSystem = new MessageContextGlobalSystem();
        messageContextGlobalSystem.setUserId(userId);

        MessageContextGlobal messageContextGlobal = new MessageContextGlobal();
        messageContextGlobal.setSystem(messageContextGlobalSystem);

        MessageContext messageContext = new MessageContext();
        messageContext.setGlobal(messageContextGlobal);

        MessageRequest messageRequest = new MessageRequest();
        messageRequest.setLanguage(language);

        messageRequest.setCountry(country);
        messageRequest.setInput(messageInput);
        messageRequest.setContext(messageContext);

        return messageRequest;

    }

}

