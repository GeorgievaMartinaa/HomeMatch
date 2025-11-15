package com.app.project.homematch.valueObject;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Embeddable
@Getter
@Builder
@AllArgsConstructor
public class ContactInfo {

    @Column(name = "email")
    private String email;
    @Column(name = "phone_number")
    private String phoneNumber;

    public ContactInfo(){}
}
