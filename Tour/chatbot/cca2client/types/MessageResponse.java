package com.example.alligatorstours.chatbot.cca2client.types;

import com.google.gson.annotations.SerializedName;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class MessageResponse {

    @SerializedName("input")
    private MessageInput input;
    private List<RuntimeIntent> intents;
    private List<RuntimeEntity> entities;
    @SerializedName("alternate_intents")
    private Boolean alternateIntents;
    private MessageContext context;
    private MessageOutput output;
    @SerializedName("request_id")
    private String requestId;

    @SerializedName("user_identifier")
    private String userIdentifier;
    @SerializedName("first_time")
    private Boolean firstTime;

}
