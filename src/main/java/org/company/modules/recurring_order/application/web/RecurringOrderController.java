package org.company.modules.recurring_order.application.web;

import org.company.modules.recurring_order.application.RecurringOrderService;
import org.company.shared.aplication.web.GenericController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/recurring_orders")
public class RecurringOrderController extends GenericController<RecurringOrderDto, Long, RecurringOrderService> {
    public RecurringOrderController(RecurringOrderService service) {
        super(service);
    }
}
