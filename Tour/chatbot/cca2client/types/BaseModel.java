package com.example.alligatorstours.chatbot.cca2client.types;

public class BaseModel {
  
  
  /**
   * Checks if the input refers to a doc_id, if so then substitutes the value 
   * from the corpus message
   * @param input
   * @return
   */
  protected String getSubstitution(String input) {
    //return "Substitution: " + input;
    return input;
  }

}
