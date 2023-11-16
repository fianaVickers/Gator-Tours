package com.example.alligatorstours.chatbot.cca2client.types;

import lombok.*;

@Data
@ToString(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class MessageContextGlobal {
    private MessageContextGlobalSystem system;
}
