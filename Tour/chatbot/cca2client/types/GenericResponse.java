package com.example.alligatorstours.chatbot.cca2client.types;

import com.google.gson.annotations.SerializedName;
import java.util.List;
import lombok.*;

@Data
@ToString(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class GenericResponse extends BaseModel {

    @SerializedName("response_type")
    private String responseType;
    @Getter(AccessLevel.NONE)
    private String text;
    private Long time;
    private Boolean typing;
    private String source;
    private String title;
    private String description;
    private String preference;
    private List<DialogOptionsElement> options;
    @SerializedName("message_to_human_agent")
    private String messageToHumanAgent;
    private String topic;
    private List<DialogSuggestion> suggestions;
    private String header;
    @Singular
    private List<SearchResult> results;
    @SerializedName("output_type")
    private String outputType;
    @SerializedName("human_agent_config")
    private HumanAgentConfig humanAgentConfig;
    //Entended responses
    @SerializedName("extended_response")
    private Object extendedResponse;

    public String getText() {
        return getSubstitution(this.text);
    }


    /**
     * The type of response returned by the dialog node. The specified response type must be supported by the client
     * application or channel.
     *
     * **Note:** The **suggestion** response type is part of the disambiguation feature, which is only available for
     * Premium users.
     */
    public interface ResponseType {

        /**
         * text.
         */
        String TEXT = "text";
        /**
         * pause.
         */
        String PAUSE = "pause";
        /**
         * image.
         */
        String IMAGE = "image";
        /**
         * option.
         */
        String OPTION = "option";
        /**
         * connect_to_agent.
         */
        String CONNECT_TO_AGENT = "connect_to_agent";
        /**
         * suggestion.
         */
        String SUGGESTION = "suggestion";
        /**
         * search.
         */
        String SEARCH = "search";


    }


}
