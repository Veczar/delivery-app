package org.company.modules.order.application.web;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;
import org.company.modules.address.domain.Address;
import org.company.modules.user.domain.User;

import java.util.Date;
@Getter
@Setter
public class OrderDto {
    private Long id;
    private Address addressStart;
    private Address addressEnd;
    private User customer;
    private Double totalPrice;
    private Double tip;
    private Date creationDate;
    private Date completionDate;
}
