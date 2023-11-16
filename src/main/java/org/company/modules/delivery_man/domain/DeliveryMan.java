package org.company.modules.delivery_man.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.company.modules.user.domain.User;

@Getter
@Setter
@Entity
@Table(name = "p_delivery_man")
public class DeliveryMan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String working_area;
    private int rating;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
