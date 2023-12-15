package org.company.modules.product.application.web;

import org.company.modules.product.application.ProductService;
import org.company.shared.aplication.web.GenericController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/products")
public class ProductController extends GenericController<ProductDto, Long, ProductService> {

    public ProductController(ProductService service) {
        super(service);
    }
}
