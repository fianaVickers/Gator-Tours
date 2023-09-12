package com.example.alligatorstours.chatbot.cca2client.types;

import java.util.Map;
import lombok.*;

@Data
@ToString(callSuper = true)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageContext {

    private MessageContextGlobal global;
    private Map<String, Object> skills;

    public void setGlobal(MessageContextGlobal messageContextGlobal) {
        global = messageContextGlobal;

    }

}
