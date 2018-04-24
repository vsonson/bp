package com.balpos.app.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.balpos.app.domain.enumeration.UserStatus;

import com.balpos.app.domain.enumeration.UserType;

/**
 * A UserInfo.
 */
@Entity
@Table(name = "user_info")
public class UserInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "userstatus")
    private UserStatus userstatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_type")
    private UserType userType;

    @Column(name = "year_of_birth")
    private String yearOfBirth;

    @Column(name = "gender")
    private String gender;

    @Column(name = "primary_sport")
    private String primarySport;

    @Column(name = "education_level")
    private String educationLevel;

    @Column(name = "country_code")
    private String countryCode;

    @Column(name = "state_code")
    private String stateCode;

    @Column(name = "last_quote_date")
    private LocalDate lastQuoteDate;

    @Column(name = "last_quote_id")
    private Long lastQuoteId;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @ManyToMany
    @JoinTable(name = "user_info_quote_of_the_day",
               joinColumns = @JoinColumn(name="user_infos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="quote_of_the_days_id", referencedColumnName="id"))
    private Set<QuoteOfTheDay> quoteOfTheDays = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserStatus getUserstatus() {
        return userstatus;
    }

    public UserInfo userstatus(UserStatus userstatus) {
        this.userstatus = userstatus;
        return this;
    }

    public void setUserstatus(UserStatus userstatus) {
        this.userstatus = userstatus;
    }

    public UserType getUserType() {
        return userType;
    }

    public UserInfo userType(UserType userType) {
        this.userType = userType;
        return this;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public String getYearOfBirth() {
        return yearOfBirth;
    }

    public UserInfo yearOfBirth(String yearOfBirth) {
        this.yearOfBirth = yearOfBirth;
        return this;
    }

    public void setYearOfBirth(String yearOfBirth) {
        this.yearOfBirth = yearOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public UserInfo gender(String gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPrimarySport() {
        return primarySport;
    }

    public UserInfo primarySport(String primarySport) {
        this.primarySport = primarySport;
        return this;
    }

    public void setPrimarySport(String primarySport) {
        this.primarySport = primarySport;
    }

    public String getEducationLevel() {
        return educationLevel;
    }

    public UserInfo educationLevel(String educationLevel) {
        this.educationLevel = educationLevel;
        return this;
    }

    public void setEducationLevel(String educationLevel) {
        this.educationLevel = educationLevel;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public UserInfo countryCode(String countryCode) {
        this.countryCode = countryCode;
        return this;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getStateCode() {
        return stateCode;
    }

    public UserInfo stateCode(String stateCode) {
        this.stateCode = stateCode;
        return this;
    }

    public void setStateCode(String stateCode) {
        this.stateCode = stateCode;
    }

    public LocalDate getLastQuoteDate() {
        return lastQuoteDate;
    }

    public UserInfo lastQuoteDate(LocalDate lastQuoteDate) {
        this.lastQuoteDate = lastQuoteDate;
        return this;
    }

    public void setLastQuoteDate(LocalDate lastQuoteDate) {
        this.lastQuoteDate = lastQuoteDate;
    }

    public Long getLastQuoteId() {
        return lastQuoteId;
    }

    public UserInfo lastQuoteId(Long lastQuoteId) {
        this.lastQuoteId = lastQuoteId;
        return this;
    }

    public void setLastQuoteId(Long lastQuoteId) {
        this.lastQuoteId = lastQuoteId;
    }

    public User getUser() {
        return user;
    }

    public UserInfo user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<QuoteOfTheDay> getQuoteOfTheDays() {
        return quoteOfTheDays;
    }

    public UserInfo quoteOfTheDays(Set<QuoteOfTheDay> quoteOfTheDays) {
        this.quoteOfTheDays = quoteOfTheDays;
        return this;
    }

    public UserInfo addQuoteOfTheDay(QuoteOfTheDay quoteOfTheDay) {
        this.quoteOfTheDays.add(quoteOfTheDay);
        quoteOfTheDay.getUserInfos().add(this);
        return this;
    }

    public UserInfo removeQuoteOfTheDay(QuoteOfTheDay quoteOfTheDay) {
        this.quoteOfTheDays.remove(quoteOfTheDay);
        quoteOfTheDay.getUserInfos().remove(this);
        return this;
    }

    public void setQuoteOfTheDays(Set<QuoteOfTheDay> quoteOfTheDays) {
        this.quoteOfTheDays = quoteOfTheDays;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserInfo userInfo = (UserInfo) o;
        if (userInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserInfo{" +
            "id=" + getId() +
            ", userstatus='" + getUserstatus() + "'" +
            ", userType='" + getUserType() + "'" +
            ", yearOfBirth='" + getYearOfBirth() + "'" +
            ", gender='" + getGender() + "'" +
            ", primarySport='" + getPrimarySport() + "'" +
            ", educationLevel='" + getEducationLevel() + "'" +
            ", countryCode='" + getCountryCode() + "'" +
            ", stateCode='" + getStateCode() + "'" +
            ", lastQuoteDate='" + getLastQuoteDate() + "'" +
            ", lastQuoteId=" + getLastQuoteId() +
            "}";
    }
}
