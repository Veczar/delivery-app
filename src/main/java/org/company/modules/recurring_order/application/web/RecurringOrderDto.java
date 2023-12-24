package org.company.modules.recurring_order.application.web;

import lombok.Getter;
import lombok.Setter;
import org.company.modules.address.application.web.AddressDto;
import org.company.modules.product.application.web.ProductDto;
import org.company.modules.recurring_order.domain.Frequency;
import org.company.modules.user.application.web.UserDto;

import java.util.Date;
@Getter
@Setter
public class RecurringOrderDto {
    private Long id;
    private AddressDto addressStart;
    private AddressDto addressEnd;
    private int quantity;
    private Frequency frequency;
    private Date startDate;
    private UserDto customer;
    private ProductDto product;
}
