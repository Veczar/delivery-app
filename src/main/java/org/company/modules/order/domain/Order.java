package org.company.modules.order.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.company.modules.address.domain.Address;
import org.company.modules.delivery_man.domain.DeliveryMan;
import org.company.modules.partner.domain.Partner;
import org.company.modules.user.domain.User;

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
    
    @ManyToOne
    @JoinColumn(name = "address_start_id")
    private Address addressStart;
    
    @ManyToOne
    @JoinColumn(name = "address_end_id")
    private Address addressEnd;
    
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer;
    
    @ManyToOne
    @JoinColumn(name = "partner_id")
    private Partner partner;
    
    @ManyToOne
    @JoinColumn(name = "courier_id")
    private DeliveryMan deliveryMan;
    
    private Double totalPrice;
    private Double tip;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;
    @Temporal(TemporalType.TIMESTAMP)
    private Date completionDate;
    
    @Enumerated(EnumType.STRING)
    private Status status;
    
    private Double distanceInKm;
}
