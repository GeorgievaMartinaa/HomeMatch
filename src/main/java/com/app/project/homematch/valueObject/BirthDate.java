package com.app.project.homematch.valueObject;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.Period;

@Embeddable
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BirthDate {

    @Column(name = "birth_date")
    private LocalDate birthDate;

    public int getAge(){
        Period period = Period.between(LocalDate.now(), getBirthDate());
        return period.getYears();
    }
}
