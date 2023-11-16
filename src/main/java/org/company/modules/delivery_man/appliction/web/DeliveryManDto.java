package org.company.modules.delivery_man.appliction.web;

import lombok.Getter;
import lombok.Setter;
import org.company.modules.user.application.web.UserDto;

@Getter
@Setter
public class DeliveryManDto {
    private long id;
    private String working_area;
    private int rating;

    private UserDto userDto;
}
