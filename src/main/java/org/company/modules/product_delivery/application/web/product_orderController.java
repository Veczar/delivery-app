package org.company.modules.product_delivery.application.web;

import lombok.AllArgsConstructor;
import org.company.modules.product_delivery.application.product_orderService;
import org.company.modules.product_delivery.domain.product_orderPk;
import org.company.shared.aplication.web.GenericController;
import org.company.shared.aplication.web.IController;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/product_order")
@AllArgsConstructor
public class product_orderController implements IController {

    protected final product_orderService service;
    @GetMapping
    public List<product_orderDto> getAllItems() {
        return service.getAllItems();
    }

    @GetMapping("/{productId}/{orderId}")
    public product_orderDto getItem(@PathVariable("productId") Long productId,
                                    @PathVariable("orderId") Long orderId) {

        return service.getItem(new product_orderPk(productId, orderId));
    }

    @DeleteMapping("/{productId}/{orderId}")
    public product_orderDto removeItem(@PathVariable("productId") Long productId,
                                       @PathVariable("orderId") Long orderId) {
        return service.removeItem(new product_orderPk(productId, orderId));
    }

    @PostMapping
    public product_orderDto createItem(@RequestBody product_orderDto dto) {
        return service.saveItem(dto);
    }

    @PutMapping("/{productId}/{orderId}")
    public product_orderDto updateItem(@PathVariable("productId") Long productId,
                                       @PathVariable("orderId") Long orderId,
                                       @RequestBody product_orderDto dto) {
        return service.updateItem(new product_orderPk(productId, orderId), dto);
    }

}
