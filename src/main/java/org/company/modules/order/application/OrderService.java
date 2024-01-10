package org.company.modules.order.application;

import org.company.modules.delivery_man.domain.DeliveryMan;
import org.company.modules.delivery_man.domain.DeliveryManRepository;
import org.company.modules.order.application.web.OrderDto;
import org.company.modules.order.application.web.OrderReadDto;
import org.company.modules.order.domain.Order;
import org.company.modules.order.domain.OrderRepository;
import org.company.modules.order.domain.OrderSpecifications;
import org.company.modules.order.domain.Status;
import org.company.shared.aplication.GenericService;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService extends GenericService<Order, OrderDto, Long, OrderRepository,OrderAssembler> {
    private final DeliveryManRepository deliveryManRepository;
    public OrderService(OrderRepository repository, OrderAssembler assembler, DeliveryManRepository deliveryManRepository) {
        super(repository, assembler);
        this.deliveryManRepository = deliveryManRepository;
    }
    public List<OrderReadDto> getOrdersWithUserEmailForDeliveryMan(String email) {
        Specification<Order> spec = OrderSpecifications.filterOrdersByUserEmailAndStatus(email);
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

    public List<OrderReadDto> getAllWithByCustomerId(@PathVariable Long id)
    {
        List<OrderReadDto> list = repository.findByCustomer_IdOrderByCreationDateDesc(id)
                .stream()
                .map(assembler::toReadDto)
                .collect(Collectors.toList());
        return list;
    }

    public OrderReadDto setOrderRating(Long id, Long rating)
    {
        Order order = repository.findById(id).orElse(null);
        order.setRating(rating);
        return assembler.toReadDto(repository.save(order));
    }
    public List<OrderReadDto> getOrdersByPartnerUserId(Long partnerUserId) {
        List<OrderReadDto> list = repository.findByPartner_Owner_Id(partnerUserId)
                .stream()
                .map(assembler::toReadDto)
                .collect(Collectors.toList());
        return list;
    }

    @GetMapping("/assign/{id}")
    public OrderReadDto assignToDeliveryMan(Long id, Long userId) {
        Order order = repository.findById(id).orElse(null);
        DeliveryMan deliveryMan =  deliveryManRepository.findByUser_Id(userId);
        order.setDeliveryMan(deliveryMan);
        return assembler.toReadDto(repository.save(order));
    }
}
