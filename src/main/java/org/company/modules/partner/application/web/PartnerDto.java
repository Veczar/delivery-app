package org.company.modules.partner.application.web;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.company.modules.address.application.web.AddressDto;
import org.company.modules.user.application.web.UserDto;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PartnerDto {
    private long id;
    private String name;
    private String accountNumber;
    private String contactNumber;
    
    private AddressDto address;
    private UserDto owner;
}
