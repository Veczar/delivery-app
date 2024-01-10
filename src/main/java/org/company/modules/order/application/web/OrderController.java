package org.company.modules.order.application.web;

import org.company.modules.order.application.OrderService;
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
    @PutMapping("/make-done/{id}")
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

}
