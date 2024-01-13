package org.company.modules.partner.application.web;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.company.modules.partner.domain.PartnerType;
import org.company.modules.user.application.web.UserDto;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PartnerDto {
    private Long id;
    private String name;
    private String description;
    private String accountNumber;
    private String contactNumber;
    private String openHour;  // HH:mm
    private String closeHour; // HH:mm
    private String websiteLink; // url
    private Integer expectedWaitingTime; //in minutes
    
    private UserDto owner;
    private String photoPath;
    private PartnerType type;
}
