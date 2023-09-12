package com.example.alligatorstours.chatbot.cca2client.types;

import com.google.gson.annotations.SerializedName;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class DialogNodeAction {

    private String name;
    private String type;
    private Map<String, Object> parameters;
    @SerializedName("result_variable")
    private String resultVariable;
    private String credentials;

    /**
     * The type of action to invoke.
     */
    public interface Type {

        /**
         * client.
         */
        String CLIENT = "client";
        /**
         * server.
         */
        String SERVER = "server";
        /**
         * web-action.
         */
        String WEB_ACTION = "web-action";
        /**
         * cloud-function.
         */
        String CLOUD_FUNCTION = "cloud-function";
    }

}
