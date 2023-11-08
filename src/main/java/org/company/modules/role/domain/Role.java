package org.company.modules.role.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "s_role")
public class Role {
    @Id
    private Long id;
    private String name;
}
