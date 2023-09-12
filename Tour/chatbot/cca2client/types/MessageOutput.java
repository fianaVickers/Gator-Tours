package com.example.alligatorstours.chatbot.cca2client.types;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
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

public class MessageOutput {


    private List<GenericResponse> generic;
    private List<RuntimeIntent> intents;
    private List<RuntimeEntity> entities;
    private List<DialogNodeAction> actions;
    private Object debug;
    @SerializedName("user_defined")
    private Map<String, Object> userDefined;


    public void addGeneric(GenericResponse genericResponse) {
        if (generic == null) {
            generic = new ArrayList<GenericResponse>();
        }
        generic.add(genericResponse);
    }
}
