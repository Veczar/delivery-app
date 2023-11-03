package org.company.modules.user.application.web;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserReadDto {
    private Long id;
    private String firstName;
    private String lastName;
}
