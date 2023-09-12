package com.example.alligatorstours.chatbot.cca2client.types;

import com.google.gson.annotations.SerializedName;
import java.util.List;
import java.util.Map;
import lombok.*;

@Data
@ToString(callSuper = true)
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class MessageInput {

    @SerializedName("message_type")
    private String messageType;
    private String text;
    private String context;
    private String target;
    @SerializedName("ui_action")
    private String uiAction;
    private Map<String, Object> params;
    @SerializedName("ui_params")
    private Map<String, Object> uiParams;
    private MessageInputOptions options;
    private List<RuntimeIntent> intents;
    private List<RuntimeEntity> entities;
    @SerializedName("suggestion_id")
    private String suggestionId;

    /**
     * The type of user input. Currently, only text input is supported.
     */
    public interface MessageType {

        /**
         * text.
         */
        String TEXT = "text";
        String SPEECH = "speech";
    }
}
