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
public class RegisterUserDto {

    private String firstName;
    private String lastName;
    private String telephoneNumber;
    private AddressDto address;
    private String email;
    private String password;
}
