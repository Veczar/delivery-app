package org.company.modules.user.application.web;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String password;
    private String telephoneNumber;
    
    //private List<AddressDto> addresses = new ArrayList<>();
}
