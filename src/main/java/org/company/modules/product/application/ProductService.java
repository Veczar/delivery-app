package org.company.modules.product.application;

import org.company.modules.product.application.web.ProductDto;
import org.company.modules.product.application.web.ProductReadDto;
import org.company.modules.product.domain.Product;
import org.company.modules.product.domain.ProductRepository;
import org.company.shared.aplication.GenericService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class ProductService extends GenericService<Product, ProductDto, Long,  ProductRepository, ProductAssembler>
{
    private final ProductRepository productRepository;
    private final ProductAssembler productAssembler;
    
    public ProductService(ProductRepository productRepository, ProductAssembler productAssembler)
    {
        super(productRepository,productAssembler);
        this.productRepository = productRepository;
        this.productAssembler = productAssembler;
    }
    
    public List<ProductReadDto> productsFromPartner(Long partnerId) {
        return productRepository.findByPartnerId(partnerId)
                .stream().map(productAssembler::toReadDto).collect(Collectors.toList());
    }
}
