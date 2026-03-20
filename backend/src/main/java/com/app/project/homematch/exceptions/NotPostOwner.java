package com.app.project.homematch.exceptions;

public class NotPostOwner extends RuntimeException {

  public String NotPostOwner(String username, Long postId) {
    return(String.format("Post can't be edited/deleted because user %s is not a owner to the post with id %d", username, postId));

  }
}
