package org.company.modules.category.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.company.modules.partner.domain.Partner;
import org.company.modules.product.domain.Product;

import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "p_category")
public class Category extends Partner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
}
