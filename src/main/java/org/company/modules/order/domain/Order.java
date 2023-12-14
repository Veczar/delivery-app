package org.company.modules.order.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.company.modules.address.domain.Address;
import org.company.modules.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "p_order")
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "address_start_id")
    private Address addressStart;
    @OneToOne
    @JoinColumn(name = "address_end_id")
    private Address addressEnd;
    @OneToOne
    @JoinColumn(name = "customer_id")
    private User customer;
    private Double totalPrice;
    private Double tip;
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;
    @Temporal(TemporalType.TIMESTAMP)
    private Date completionDate;
}
