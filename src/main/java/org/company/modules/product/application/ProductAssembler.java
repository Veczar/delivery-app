package org.company.modules.product.application;

import lombok.AllArgsConstructor;
import org.company.modules.category.application.CategoryAssembler;
import org.company.modules.category.application.web.CategoryDto;
import org.company.modules.category.domain.Category;
import org.company.modules.category.domain.CategoryRepository;
import org.company.modules.product.application.web.ProductDto;
import org.company.modules.product.domain.Product;
import org.company.shared.aplication.IAssembler;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class ProductAssembler implements IAssembler<Product, ProductDto> {
    private static CategoryRepository categoryRepository;
    @Override
    public ProductDto toDto(Product product) {
        CategoryAssembler categoryAssembler = new CategoryAssembler();
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setPhotoPath(product.getPhotoPath());
        productDto.setOnSale(product.getOnSale());
        productDto.setPrice(product.getPrice());
        productDto.setCategories(product.getCategories().stream().map(categoryAssembler::toDto).collect(Collectors.toSet()));
        return productDto;
    }

    @Override
    public void toEntity(ProductDto dto, Product product) {
        CategoryAssembler categoryAssembler = new CategoryAssembler();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPhotoPath(dto.getPhotoPath());
        product.setOnSale(dto.getOnSale());
        product.setPrice(dto.getPrice());
        product.setCategories(dto.getCategories().stream().map(categoryDto -> getCategory(categoryDto)).collect(Collectors.toSet()));
    }

    private Category getCategory(CategoryDto category)
    {
        Category result = categoryRepository.findById(category.getId()).orElseThrow(null);
        return result;
    }


}
