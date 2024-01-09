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
public class OrderDto {
    private Long id;
    private AddressDto addressStart;
    private AddressDto addressEnd;
    private UserDto customer;
    private PartnerDto partner;
    private DeliveryManDto deliveryMan;
    private Double totalPrice;
    private Double tip;
    private Date creationDate;
    private Date completionDate;
    private Status status;
    private Double distanceInKm;
}
