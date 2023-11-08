package org.company.modules.user.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.company.modules.role.domain.Role;


@Getter
@Setter
@Entity
@Table(name = "p_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String telephoneNumber;
    private String login;
    private String password;
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
}
