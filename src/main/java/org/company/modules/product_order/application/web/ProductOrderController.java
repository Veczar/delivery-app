package org.company.modules.product_order.application.web;

import lombok.AllArgsConstructor;
import org.company.modules.product_order.application.ProductOrderService;
import org.company.modules.product_order.domain.ProductOrderPk;
import org.company.shared.aplication.web.IController;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/product_order")
@AllArgsConstructor
public class ProductOrderController implements IController {

    protected final ProductOrderService service;
    @GetMapping
    public List<ProductOrderDto> getAllItems() {
        return service.getAllItems();
    }

    @GetMapping("/{productId}/{orderId}")
    public ProductOrderDto getItem(@PathVariable("productId") Long productId,
                                   @PathVariable("orderId") Long orderId) {

        return service.getItem(new ProductOrderPk(productId, orderId));
    }

    @DeleteMapping("/{productId}/{orderId}")
    public ProductOrderDto removeItem(@PathVariable("productId") Long productId,
                                      @PathVariable("orderId") Long orderId) {
        return service.removeItem(new ProductOrderPk(productId, orderId));
    }

    @PostMapping
    public ProductOrderDto createItem(@RequestBody ProductOrderDto dto) {
        return service.saveItem(dto);
    }

    @PutMapping("/{productId}/{orderId}")
    public ProductOrderDto updateItem(@PathVariable("productId") Long productId,
                                      @PathVariable("orderId") Long orderId,
                                      @RequestBody ProductOrderDto dto) {
        return service.updateItem(new ProductOrderPk(productId, orderId), dto);
    }

}
