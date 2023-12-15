package org.company.modules.order.application;

import org.company.modules.order.application.web.OrderDto;
import org.company.modules.order.domain.Order;
import org.company.modules.order.domain.OrderRepository;
import org.company.shared.aplication.GenericService;
import org.springframework.stereotype.Service;

@Service
public class OrderService extends GenericService<Order, OrderDto, Long, OrderRepository,OrderAssembler> {
    public OrderService(OrderRepository repository, OrderAssembler assembler) {
        super(repository, assembler);
    }
}
