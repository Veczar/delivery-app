package org.company.modules.complaint.application.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.company.modules.complaint.web.ContactMethod;
import org.company.modules.user.application.web.UserDto;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ComplaintReadDto {
    private long id;
    private String description;
    private String title;
    private ContactMethod methodOfContact;
    private Date creationDate;
    private String userFirstName;
    private String userLastName;
    private String userEmail;
    private String userTelephoneNumber;
}
