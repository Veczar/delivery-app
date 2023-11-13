package org.company.modules.product.application.web;

import lombok.Getter;
import lombok.Setter;

    @Getter
    @Setter
    public class ProductDto {
        private Long id;
        private String name;
        private String description;
        private String photoPath;
        private Boolean onSale;
        private Double price;

    }
