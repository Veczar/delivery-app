package org.company.modules.order.application;

import org.company.modules.order.application.web.OrderDto;
import org.company.modules.order.application.web.OrderReadDto;
import org.company.modules.order.domain.Order;
import org.company.modules.order.domain.OrderRepository;
import org.company.modules.order.domain.OrderSpecifications;
import org.company.modules.order.domain.Status;
import org.company.shared.aplication.GenericService;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService extends GenericService<Order, OrderDto, Long, OrderRepository,OrderAssembler> {
    public OrderService(OrderRepository repository, OrderAssembler assembler) {
        super(repository, assembler);
    }
    public List<OrderReadDto> getOrdersWithUserEmailForDeliveryMan(String email) {
        Specification<Order> spec = OrderSpecifications.filterOrdersByUserEmailAndStatus(email);
        List<Order> listt  = repository.findAll(spec);
        List<OrderReadDto> list = repository.findAll(spec)
                .stream()
                .map(assembler::toReadDto)
                .collect(Collectors.toList());
        return list;
    }
    public OrderReadDto setStatusDone(Long id, Status status)
    {
        Order order = repository.findById(id).orElse(null);
        OrderReadDto orderReadDto = null;
        if(order != null)
        {
            order.setStatus(status);
            order.setCompletionDate(new Date());
            orderReadDto = assembler.toReadDto(repository.save(order));
        }
        return orderReadDto;
    }
}
