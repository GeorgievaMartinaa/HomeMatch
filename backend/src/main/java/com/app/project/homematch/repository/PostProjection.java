package com.app.project.homematch.repository;

import java.math.BigDecimal;
import java.time.Instant;

public interface PostProjection {
    Long getId();
    String getTitle();
    String getDescription();
    Instant getLastTimeUpdated();
    String getLocation();
    BigDecimal getPriceAmount();
    String getPriceCurrency();
    Long getCreatorId();
    String getCreatorFirstName();
    String getCreatorLastName();
    String getCreatorPhoneNumber();
    String getCreatorEmail();
    String getFetchedFrom();
    String getOriginalPostUrl();
}
