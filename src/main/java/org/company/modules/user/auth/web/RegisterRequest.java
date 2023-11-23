package org.company.modules.user.auth.web;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.company.modules.role.application.web.RoleDto;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String firstName;
    private String lastName;
    private String telephoneNumber;
    private String email;
    private String password;
    private RoleDto role;
}
