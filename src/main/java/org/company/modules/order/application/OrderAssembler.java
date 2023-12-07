package org.company.modules.order.application;

import lombok.AllArgsConstructor;
import org.company.modules.address.application.AddressAssembler;
import org.company.modules.address.domain.Address;
import org.company.modules.address.domain.AddressRepository;
import org.company.modules.order.application.web.OrderDto;
import org.company.modules.order.domain.Order;
import org.company.modules.user.domain.User;
import org.company.modules.user.domain.UserRepository;
import org.company.shared.aplication.IAssembler;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class OrderAssembler implements IAssembler<Order, OrderDto> {
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    @Override
    public OrderDto toDto(Order order) {
        AddressAssembler addressAssembler = new AddressAssembler();
        OrderDto orderDto = new OrderDto();
        orderDto.setId(order.getId());
        orderDto.setAddressStart(addressAssembler.toDto(order.getAddressStart()));
        orderDto.setCustomer(order.getCustomer());
        orderDto.setAddressEnd(addressAssembler.toDto(order.getAddressEnd()));
        orderDto.setTotalPrice(order.getTotalPrice());
        orderDto.setTip(order.getTip());
        orderDto.setCreationDate(order.getCreationDate());
        orderDto.setCompletionDate(order.getCompletionDate());
        return orderDto;
    }

    @Override
    public void toEntity(OrderDto orderDto, Order order) {
    updateAddresses(orderDto,order);
    updateCustomer(orderDto, order);
    order.setTotalPrice(orderDto.getTotalPrice());
    order.setTip(orderDto.getTip());
    order.setCreationDate(orderDto.getCreationDate());
    order.setId(orderDto.getId());
    order.setCompletionDate(orderDto.getCompletionDate());
    }
    private void updateAddresses(OrderDto orderDto, Order order) {
        Address addressStart = addressRepository.findById(orderDto.getAddressStart().getId()).orElseThrow(null);
        Address addressEnd = addressRepository.findById(orderDto.getAddressEnd().getId()).orElseThrow(null);
        order.setAddressStart(addressStart);
        order.setAddressEnd(addressEnd);
    }
    private void updateCustomer(OrderDto orderDto, Order order) {
        User customer = userRepository.findById(orderDto.getCustomer().getId()).orElseThrow(null);
        order.setCustomer(customer);
    }
}
