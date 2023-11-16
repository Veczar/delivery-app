package org.company.modules.product.application;

import lombok.AllArgsConstructor;
import org.company.modules.product.application.web.ProductDto;
import org.company.modules.product.domain.Product;
import org.company.shared.aplication.IAssembler;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ProductAssembler implements IAssembler<Product, ProductDto> {
    @Override
    public ProductDto toDto(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setPhotoPath(product.getPhotoPath());
        productDto.setOnSale(product.getOnSale());
        productDto.setPrice(product.getPrice());
        return productDto;
    }

    @Override
    public void toEntity(ProductDto dto, Product product) {
        product.setId(dto.getId());
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPhotoPath(dto.getPhotoPath());
        product.setOnSale(dto.getOnSale());
        product.setPrice(dto.getPrice());
    }
}
