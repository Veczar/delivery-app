package org.company.modules.order.application.web;

import org.company.modules.order.application.OrderService;
import org.company.shared.aplication.web.GenericController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/orders")
public class OrderController  extends GenericController<OrderDto, OrderService> {
    public OrderController(OrderService service) {
        super(service);
    }
}
