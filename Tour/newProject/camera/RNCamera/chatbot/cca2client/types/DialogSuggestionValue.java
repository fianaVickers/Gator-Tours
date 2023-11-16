package com.example.alligatorstours.chatbot.cca2client.types;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString(callSuper = true)
@NoArgsConstructor
public class DialogSuggestionValue {

    private MessageInput input;
}
