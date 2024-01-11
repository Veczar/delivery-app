package org.company.modules.complaint.web;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.company.modules.user.application.web.UserDto;
import org.company.modules.user.domain.User;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "p_complaint")
@NoArgsConstructor
@AllArgsConstructor
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String description;
    private String title;
    @Enumerated(EnumType.STRING)
    private ContactMethod methodOfContact;
    @Column(name = "creation_date")
    private Date creationDate;
    @OneToOne
    @Column(name = "user_id")
    private User user;
}
