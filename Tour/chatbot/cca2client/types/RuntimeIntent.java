package com.example.alligatorstours.chatbot.cca2client.types;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class RuntimeIntent {

    private String intent;
    private Double confidence;
}
