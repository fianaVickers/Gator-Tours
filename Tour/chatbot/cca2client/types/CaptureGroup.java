package com.example.alligatorstours.chatbot.cca2client.types;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class CaptureGroup {

    private String group;
    private List<Long> location;

}
