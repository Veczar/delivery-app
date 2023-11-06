package org.company.modules.user.application.web;

import lombok.Getter;
import lombok.Setter;
import org.company.modules.role.domain.Role;


@Getter
@Setter
public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String telephoneNumber;
    private String login;
    private String password;
    private Role role;
}
