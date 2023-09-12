package com.example.alligatorstours.chatbot.cca2client.types;

import com.google.gson.annotations.SerializedName;
import lombok.*;

@Data
@ToString(callSuper = true)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageContextGlobalSystem {

    private String timezone;
    @SerializedName("user_id")
    private String userId;
    @SerializedName("turn_count")
    private Long turnCount;

}
