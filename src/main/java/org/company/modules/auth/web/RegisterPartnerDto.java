package org.company.modules.auth.web;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.company.modules.address.application.web.AddressDto;
import org.company.modules.category.application.web.CategoryDto;
import org.company.modules.user.application.web.UserDto;

import java.util.Set;


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
    private String description;
    private String accountNumber;
    private String contactNumber;
    private String openHour;  // HH:mm
    private String closeHour; // HH:mm
    private String websiteLink; // url
    private Integer expectedWaitingTime; //in minutes
    
    private UserDto owner;
    private AddressDto address;
    private Set<CategoryDto> categories;
}
