package com.example.alligatorstours.chatbot.cca2client.types;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class DialogOptionsElementValue {

    private MessageInput input;
}
