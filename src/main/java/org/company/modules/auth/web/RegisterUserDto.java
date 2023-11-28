package org.company.modules.auth.web;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserDto {

    private String firstName;
    private String lastName;
    private String telephoneNumber;
    private String email;
    private String password;
}
