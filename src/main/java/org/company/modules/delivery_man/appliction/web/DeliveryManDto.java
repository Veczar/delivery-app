package org.company.modules.delivery_man.appliction.web;

import lombok.Getter;
import lombok.Setter;
import org.company.modules.user.application.web.UserDto;

@Getter
@Setter
public class DeliveryManDto {
    private long id;
    private String workingArea;
    private int rating;
    private String accountNumber;
    private UserDto user;
}
