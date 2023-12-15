package org.company.modules.product.application;

import org.company.modules.product.application.web.ProductDto;
import org.company.modules.product.domain.Product;
import org.company.modules.product.domain.ProductRepository;
import org.company.shared.aplication.GenericService;
import org.company.shared.aplication.IService;
import org.springframework.stereotype.Service;

@Service
public class ProductService extends GenericService<Product, ProductDto, Long,  ProductRepository, ProductAssembler>
{
    public ProductService(ProductRepository productRepository, ProductAssembler productAssembler)
    {
        super(productRepository,productAssembler);
    }
}
