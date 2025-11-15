package com.app.project.homematch.valueObject;

import com.app.project.homematch.utils.TsidGenerator;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;

import java.io.Serializable;

@Embeddable
@Getter
public class PostId implements Serializable {

    @Column(name = "id")
    public Long value;

    private PostId(Long value) {
        this.value = value;
    }

    public PostId() {

    }

    public static PostId generatePostId() {
        TsidGenerator tsidGenerator = TsidGenerator.getInstance();

        return new PostId(tsidGenerator.generateNewTsid());
    }

    public static Long getValue(PostId postId) {
        return postId.value;
    }

    public static PostId toPostId(Long value) {
        return new PostId(value);
    }


}
