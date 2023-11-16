package org.company.modules.seller.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.company.modules.address.domain.Address;
import org.company.modules.user.domain.User;


@Getter
@Setter
@Entity
@Table(name = "p_seller")
public class Seller {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    private String name;
    private String account_number;
    private String contact_number;
    
    @OneToOne
    @JoinColumn(name = "address_id")
    private Address address;
    
    @OneToOne
    @JoinColumn(name = "owner_id")
    private User owner;
}
