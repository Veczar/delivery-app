package org.company.modules.recurring_order.application.web;

import org.company.modules.recurring_order.application.RecurringOrderService;
import org.company.modules.recurring_order.domain.RecurringOrder;
import org.company.shared.aplication.web.GenericController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/recurring_orders")
public class RecurringOrderController extends GenericController<RecurringOrderDto, Long, RecurringOrderService> {
    public RecurringOrderController(RecurringOrderService service) {
        super(service);
    }
    @GetMapping("/owning/{id}")
    public List<RecurringOrderDto> getRecurringOrderAssignedToUser(@PathVariable Long id)
    {
    return  service.getRecurringOrderAssignedToUser(id);
    }
}
