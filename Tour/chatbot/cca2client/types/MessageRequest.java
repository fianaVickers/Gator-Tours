package com.example.alligatorstours.chatbot.cca2client.types;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import java.util.Date;
import java.util.List;
import lombok.*;

@Data
@ToString(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class MessageRequest {

    private MessageInput input;
    private MessageContext context;
    private String language;
    private String country;
    private boolean anonymous;
    @Expose(serialize = false, deserialize = false)
    private String assistantId;

    @Expose(serialize = false, deserialize = false)
    private String sessionId;

    @Expose(serialize = false, deserialize = false)
    private boolean extendSession;

    @SerializedName("request_id")
    private String requestId;

    @SerializedName("host_url")
    private String hosturl;

    @SerializedName("ui_log")
    private List<UILog> uiLog;

    @SerializedName("training")
    private boolean training = false;

    private String channel;

    private String source;

    @SerializedName("remove_context")
    private boolean removeContext;


    public boolean hasInput() {

        if (this.getInput() != null && (isNotBlank(this.getInput().getText())
                || isNotBlank(this.getInput().getUiAction()))) {
            return true;
        }
        return false;
    }

    public void setInputText(String text) {
        if (this.input == null) {
            input = MessageInput.builder().text(text).build();
        } else {
            input.setText(text);
        }
    }

    boolean isNotBlank(String str) {
        return str != null && !str.trim().isEmpty();
    }

    @Data
    @ToString(callSuper = true)
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UILog {

        @SerializedName("timestamp")
        private Date timestamp;

        @SerializedName("action_type")
        private String actionType;

        @SerializedName("action_target")
        private String actionTarget;

        @SerializedName("asset_id")
        private String assetId;

        @SerializedName("user_query")
        private String userQuery;

        @SerializedName("presentation_rank")
        private int presentationRank;

        private String url;
    }

}
