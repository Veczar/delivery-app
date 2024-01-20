package org.company.modules.address.application.web;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AddressDto {
    private Long id;
    private String street;
    private String city;
    private String postalCode;
    private Long userId;
    private String userRole;
}
