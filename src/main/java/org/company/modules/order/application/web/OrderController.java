package org.company.modules.order.application.web;

import org.company.modules.order.application.OrderService;
import org.company.modules.order.domain.Order;
import org.company.modules.order.domain.Status;
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
    @PutMapping("/set-status/{id}")
    public OrderReadDto setStatus(@PathVariable Long id, @RequestBody String status)
    {
        return service.setStatusDone(id, Status.valueOf(status));
    }

    @GetMapping("/my-orders/{id}")
    public List<OrderReadDto> getAllWithByCustomerId(@PathVariable Long id)
    {
        return service.getAllWithByCustomerId(id);
    }
    @PutMapping("/rating/{id}")
    public OrderReadDto setOrderRating(@PathVariable Long id,@RequestBody  Long rating)
    {
        return service.setOrderRating(id,rating);
    }
    @GetMapping("/partner/{id}")
    public List<OrderReadDto> getOrdersByPartnerUserId(@PathVariable Long id) {
        return service.getOrdersByPartnerUserId(id);
    }
    @PutMapping("/assign/{id}")
    public OrderReadDto assignToDeliveryMan(@PathVariable Long id, @RequestBody Long deliverManId ) {
        return service.assignToDeliveryMan(id, deliverManId);
    }
}
