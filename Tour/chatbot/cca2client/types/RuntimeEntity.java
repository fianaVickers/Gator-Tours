package com.example.alligatorstours.chatbot.cca2client.types;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class RuntimeEntity {

    private String entity;
    private List<Long> location;
    private String value;
    private Double confidence;
    private Map metadata;
    private List<CaptureGroup> groups;
}
