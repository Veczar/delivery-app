package org.company.modules.auth.web;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDeliveryManDto {
    
    private String firstName;
    private String lastName;
    private String telephoneNumber;
    private String email;
    private String password;
    
    // delivery man part
    private String workingArea;
    private String accountNumber;

}
