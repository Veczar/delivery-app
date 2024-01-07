package org.company.modules.partner.application.web;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.company.modules.category.application.web.CategoryDto;
import org.company.modules.user.application.web.UserDto;

import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PartnerDto {
    private long id;
    private String name;
    private String accountNumber;
    private String contactNumber;
    private UserDto owner;
    private Set<CategoryDto> categories;
}
