package org.company.modules.complaint.application.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.company.modules.complaint.web.ContactMethod;
import org.company.modules.user.application.web.UserDto;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ComplaintDto {
    private long id;
    private String description;
    private String title;
    private ContactMethod methodOfContact;
    private UserDto user;
}
