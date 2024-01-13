package org.company.modules.delivery_man.domain;

import jakarta.persistence.*;
import lombok.*;
import org.company.modules.user.domain.User;


@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "p_courier")
public class DeliveryMan {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String workingArea;
    private String accountNumber;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
