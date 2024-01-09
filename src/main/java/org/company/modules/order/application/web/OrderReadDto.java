package org.company.modules.order.application.web;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.company.modules.address.application.web.AddressDto;
import org.company.modules.delivery_man.appliction.web.DeliveryManDto;
import org.company.modules.order.domain.Status;
import org.company.modules.partner.application.web.PartnerDto;
import org.company.modules.user.application.web.UserDto;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderReadDto {
    private Long id;
    private String addressStart;
    private String addressEnd;
    private String customerFirstName;
    private String customerLastName;
    private String customerTelephoneNumber;
    private String partner;
    private Double totalPrice;
    private Double tip;
    private String creationDate;
    private String completionDate;
    private Status status;
    private Double distanceInKm;
}