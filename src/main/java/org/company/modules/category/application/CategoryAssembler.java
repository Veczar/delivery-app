package org.company.modules.category.application;

import org.company.modules.category.application.web.CategoryDto;
import org.company.modules.category.domain.Category;
import org.company.modules.product.application.ProductAssembler;
import org.company.shared.aplication.IAssembler;
import org.springframework.stereotype.Component;

@Component
public class CategoryAssembler implements IAssembler<Category, CategoryDto> {
    @Override
    public CategoryDto toDto(Category entity) {
        CategoryDto dto = new CategoryDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        return dto;
    }

    @Override
    public void toEntity(CategoryDto dto, Category entity) {
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
    }
}
