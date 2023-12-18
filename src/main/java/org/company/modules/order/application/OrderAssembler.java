package org.company.modules.order.application;

import lombok.AllArgsConstructor;
import org.company.modules.address.application.AddressAssembler;
import org.company.modules.address.domain.Address;
import org.company.modules.address.domain.AddressRepository;
import org.company.modules.category.application.CategoryAssembler;
import org.company.modules.category.domain.CategoryRepository;
import org.company.modules.delivery_man.appliction.DeliveryManAssembler;
import org.company.modules.delivery_man.domain.DeliveryMan;
import org.company.modules.delivery_man.domain.DeliveryManRepository;
import org.company.modules.order.application.web.OrderDto;
import org.company.modules.order.domain.Order;
import org.company.modules.partner.application.PartnerAssembler;
import org.company.modules.partner.domain.Partner;
import org.company.modules.partner.domain.PartnerRepository;
import org.company.modules.role.application.RoleAssembler;
import org.company.modules.role.domain.RoleRepository;
import org.company.modules.user.application.UserAssembler;
import org.company.modules.user.domain.User;
import org.company.modules.user.domain.UserRepository;
import org.company.shared.aplication.IAssembler;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class OrderAssembler implements IAssembler<Order, OrderDto> {
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final RoleAssembler roleAssembler;
    private final RoleRepository roleRepository;
    private final CategoryRepository categoryRepository;
    private final DeliveryManRepository deliveryManRepository;
    private final PartnerRepository partnerRepository;
    @Override
    public OrderDto toDto(Order order) {
        AddressAssembler addressAssembler = new AddressAssembler();
        UserAssembler userAssembler = new UserAssembler(roleAssembler,roleRepository);
        DeliveryManAssembler deliveryManAssembler = new DeliveryManAssembler(userAssembler,userRepository);
        PartnerAssembler partnerAssembler = new PartnerAssembler(userAssembler,userRepository,addressAssembler,addressRepository,new CategoryAssembler(),categoryRepository);
        OrderDto orderDto = new OrderDto();
        orderDto.setId(order.getId());
        orderDto.setAddressStart(addressAssembler.toDto(order.getAddressStart()));
        orderDto.setCustomer(userAssembler.toDto(order.getCustomer()));
        orderDto.setAddressEnd(addressAssembler.toDto(order.getAddressEnd()));
        orderDto.setDeliveryMan(deliveryManAssembler.toDto(order.getDeliveryMan()));
        orderDto.setPartner(partnerAssembler.toDto(order.getPartner()));
        orderDto.setTotalPrice(order.getTotalPrice());
        orderDto.setTip(order.getTip());
        orderDto.setCreationDate(order.getCreationDate());
        orderDto.setCompletionDate(order.getCompletionDate());
        orderDto.setStatus(order.getStatus());
        return orderDto;
    }

    @Override
    public void toEntity(OrderDto orderDto, Order order) {
    updateAddresses(orderDto,order);
    updateCustomer(orderDto, order);
    updateDeliveryMan(orderDto, order);
    updatePartner(orderDto, order);
    order.setTotalPrice(orderDto.getTotalPrice());
    order.setTip(orderDto.getTip());
    order.setCreationDate(orderDto.getCreationDate());
    order.setCompletionDate(orderDto.getCompletionDate());
    order.setStatus(orderDto.getStatus());
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
    private void updateDeliveryMan(OrderDto orderDto, Order order) {
        DeliveryMan deliveryMan =  deliveryManRepository.findById(orderDto.getDeliveryMan().getId()).orElseThrow(null);
        order.setDeliveryMan(deliveryMan);
    }
    private void updatePartner(OrderDto orderDto, Order order) {
        Partner partner = partnerRepository.findById(orderDto.getPartner().getId()).orElseThrow(null);
        order.setPartner(partner);
    }
}
