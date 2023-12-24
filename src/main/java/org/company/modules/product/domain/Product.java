package org.company.modules.product.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.company.modules.category.domain.Category;
import org.company.modules.partner.domain.Partner;

import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "p_product")
public class Product  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String photoPath;
    private Boolean onSale;
    private Double price;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "product_category",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Set<Category> categories;
    @OneToOne
    @JoinColumn(name = "partner_id")
    private Partner partner;

}
