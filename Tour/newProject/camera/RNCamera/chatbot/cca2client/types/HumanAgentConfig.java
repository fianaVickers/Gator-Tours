package com.example.alligatorstours.chatbot.cca2client.types;

import com.google.gson.annotations.SerializedName;
import lombok.*;

@Data
@ToString(callSuper = true)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HumanAgentConfig {

    private String type;
    @SerializedName("account_id")
    private String accountId;

    @SerializedName("api_key")
    private String apiKey;

    @SerializedName("initial_message")
    private String initialMessage;

    @SerializedName("not_available_message")
    private String notAvailableMessage;


    @SerializedName("skill_name")
    private String skillName;

    @SerializedName("skill_id")
    private String skillId;

    private String token;
    private String consumerId;
    private String sessionId;
    private String visitorId;
    private boolean status;
    private long campaignId;
    private long engagementId;


    @SerializedName("user_data")
    private UserData userData;

    @SerializedName("app_data")

    private AppData appData;

    @Data
    @ToString(callSuper = true)
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserData {

        private String name;
        private String language;
    }

    @Data
    @ToString(callSuper = true)
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AppData {

        private String ipAddress;
        private String os;
        private String osVersion;
        private String deviceFamily;
    }

}
