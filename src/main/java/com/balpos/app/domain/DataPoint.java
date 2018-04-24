package com.balpos.app.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DataPoint.
 */
@Entity
@Table(name = "data_point")
public class DataPoint implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "jhi_order")
    private Integer order;

    @Column(name = "tracking")
    private Boolean tracking;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public DataPoint name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getOrder() {
        return order;
    }

    public DataPoint order(Integer order) {
        this.order = order;
        return this;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public Boolean isTracking() {
        return tracking;
    }

    public DataPoint tracking(Boolean tracking) {
        this.tracking = tracking;
        return this;
    }

    public void setTracking(Boolean tracking) {
        this.tracking = tracking;
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
        DataPoint dataPoint = (DataPoint) o;
        if (dataPoint.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dataPoint.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DataPoint{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", order=" + getOrder() +
            ", tracking='" + isTracking() + "'" +
            "}";
    }
}
