package org.company.modules.order.application.web;

import org.company.modules.order.application.OrderService;
import org.company.shared.aplication.web.GenericController;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/orders")
public class OrderController  extends GenericController<OrderDto, Long, OrderService> {
    public OrderController(OrderService service) {
        super(service);
    }
    @GetMapping("/assigned/{email}")
    public List<OrderReadDto> getAllOrdersConnectedWithDeliveryMan(@PathVariable String email)
    {
        return service.getOrdersWithUserEmailForDeliveryMan(email);
    }
    @PutMapping("/make-done/{id}")
    public OrderReadDto getAllOrdersConnectedWithDeliveryMan(@PathVariable Long id, @RequestBody Double distance)
    {
        return service.setStatusDone(id, distance);
    }
}
