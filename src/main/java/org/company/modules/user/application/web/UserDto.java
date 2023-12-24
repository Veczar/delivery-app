package org.company.modules.user.application.web;

import lombok.Getter;
import lombok.Setter;
import org.company.modules.address.application.web.AddressDto;
import org.company.modules.role.application.web.RoleDto;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String telephoneNumber;
    private String email;
    private RoleDto role;
    private List<AddressDto> addresses = new ArrayList<>();
}
