package com.example.alligatorstours.chatbot.cca2client.types;

import com.google.gson.annotations.SerializedName;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MessageInputOptions {

    private Boolean debug;
    private Boolean restart;
    @SerializedName("alternate_intents")
    private Boolean alternateIntents;
    @SerializedName("return_context")
    private Boolean returnContext;
}
