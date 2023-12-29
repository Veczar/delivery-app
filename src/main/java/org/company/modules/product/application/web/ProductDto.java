package org.company.modules.product.application.web;

import lombok.Getter;
import lombok.Setter;
import org.company.modules.category.application.web.CategoryDto;
import org.company.modules.partner.application.web.PartnerDto;
import java.util.Set;

    @Getter
    @Setter
    public class ProductDto {
        private Long id;
        private String name;
        private String description;
        private String photoPath;
        private Boolean onSale;
        private Double price;
        Set<CategoryDto> categories;
        private PartnerDto partner;

    }
