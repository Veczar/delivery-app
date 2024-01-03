package org.company.modules.recurring_order.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.company.modules.address.domain.Address;
import org.company.modules.product.domain.Product;
import org.company.modules.user.domain.User;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "p_recurring_orders")
public class RecurringOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "address_start_id")
    private Address addressStart;
    @OneToOne
    @JoinColumn(name = "address_end_id")
    private Address addressEnd;
    private int quantity;
    @Enumerated(EnumType.STRING)
    private Frequency frequency;
    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;
    @OneToOne
    @JoinColumn(name = "customer_id")
    private User customer;
    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
