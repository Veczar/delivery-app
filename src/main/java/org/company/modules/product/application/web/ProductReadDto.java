package org.company.modules.product.application.web;

import lombok.Getter;
import lombok.Setter;
import org.company.modules.category.application.web.CategoryDto;

import java.util.Set;

@Getter
@Setter
public class ProductReadDto {
    private Long id;
    private String name;
    private String photoPath;
    private Boolean onSale;
    private Double price;
    Set<CategoryDto> categories;
}
