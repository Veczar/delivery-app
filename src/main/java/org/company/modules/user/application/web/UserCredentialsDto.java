package org.company.modules.user.application.web;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserCredentialsDto {
    private String firstName;
    private String lastName;
    private String password;
}
