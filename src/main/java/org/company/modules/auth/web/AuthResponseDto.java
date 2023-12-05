package org.company.modules.auth.web;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponseDto {
    
    private String token;
    private String role;
    private String expirationDate;
    private String firstName;
    private String lastName;
    private String error;
}
