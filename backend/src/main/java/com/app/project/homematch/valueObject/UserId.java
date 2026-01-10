package com.app.project.homematch.valueObject;

import com.app.project.homematch.utils.TsidGenerator;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Embeddable
@Data
public class UserId implements Serializable {

    @Column(name = "id")
    private Long value;

    public UserId() {
    }

    private UserId(Long value) {
        this.value = value;
    }

    public static UserId toUserId(Long value) {
        return new UserId(value);
    }

    public static UserId generateUserId(){
        return new UserId(TsidGenerator.getInstance().generateNewTsid());
    }

    public static Long getValue(UserId userId){
        return userId.value;
    }

}
