package com.app.project.homematch.valueObject;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.math.BigDecimal;
import java.util.Objects;

@Embeddable
public final class Money {
        private final BigDecimal amount;
        @Enumerated(value = EnumType.STRING)
        private final Currency currency;

        public Money(BigDecimal amount, Currency currency) {
            this.amount = amount;
            this.currency = currency;
        }
        public Money() {
            this.amount = BigDecimal.ZERO;
            this.currency = Currency.MKD;
        }

        public BigDecimal getAmount() {
            return amount;
        }

        public Currency getCurrency() {
            return currency;
        }

        public Money add(Money other) {
            if (!compatibleCurrency(other)) {
                throw new IllegalArgumentException("Cannot add money of different currencies.");
            }
            return new Money(this.amount.add(other.amount), this.currency);
        }

        public Money subtract(Money other){
            if(!compatibleCurrency(other)){
                throw new IllegalArgumentException("Cannot subtract money of different currencies");
            }

            return new Money(this.amount.subtract(other.amount), this.currency);
        }

        private boolean compatibleCurrency(Money money){
            return this.currency.equals(money.currency);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Money money = (Money) o;
            return amount.equals(money.amount) && currency.equals(money.currency);
        }

        @Override
        public int hashCode() {
            return Objects.hash(amount, currency);
        }

        @Override
        public String toString() {
            return currency + " " + amount;
        }
 }
