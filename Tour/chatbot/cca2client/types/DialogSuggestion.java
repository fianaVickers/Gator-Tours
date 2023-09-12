package com.example.alligatorstours.chatbot.cca2client.types;

import java.util.Map;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString(callSuper = true)
@NoArgsConstructor
public class DialogSuggestion {

    private String label;
    private DialogSuggestionValue value;
    private Map<String, Object> output;

}
