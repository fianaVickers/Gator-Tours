package com.example.alligatorstours.chatbot.cca2client.types;

import com.google.gson.annotations.SerializedName;
import lombok.*;

@Data
@ToString(callSuper = true)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchResult {

    private String id;
    @SerializedName("document_id")
    private String documentId;
    @SerializedName("result_metadata")
    private SearchResultMetadata resultMetadata;
    private String body;
    private String overview;
    private String title;
    private String url;
    private String type;
    private String icon;
    private Object highlight;
    private String target;

}
