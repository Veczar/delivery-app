package org.company.modules.partner.domain;

import jakarta.persistence.*;
import lombok.*;
import org.company.modules.address.domain.Address;
import org.company.modules.category.domain.Category;
import org.company.modules.user.domain.User;

import java.util.Set;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "p_partner")
public class Partner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String accountNumber;
    private String contactNumber;

//    @OneToOne
//    @JoinColumn(name = "address_id")
//    private Address address;

    @OneToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @ManyToMany
    @JoinTable(
            name = "partner_category",
            joinColumns = @JoinColumn(name = "partner_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<Category> categories;
}
