package org.company.modules.auth.web;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.company.modules.address.application.web.AddressDto;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterPartnerDto {

    private String firstName;
    private String lastName;
    private String telephoneNumber;
    private String email;
    private String password;
    
    // partner part
    private String name;
    private String accountNumber;
    private String contactNumber;
    private AddressDto address;
}
