package org.company.modules.product.application.web;

import org.company.modules.product.application.ProductService;
import org.company.shared.aplication.web.GenericController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
@RequestMapping("api/products")
public class ProductController extends GenericController<ProductDto, Long, ProductService> {

    public ProductController(ProductService service) {
        super(service);
    }
    
    @GetMapping("/from/{partnerId}")
    public List<ProductReadDto> productsFromPartner(@PathVariable Long partnerId) {
        return service.productsFromPartner(partnerId);
    }
}
