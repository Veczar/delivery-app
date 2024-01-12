package org.company.modules.recurring_order.application;

import lombok.AllArgsConstructor;
import org.company.modules.address.application.AddressAssembler;
import org.company.modules.address.domain.Address;
import org.company.modules.address.domain.AddressRepository;
import org.company.modules.product.application.ProductAssembler;
import org.company.modules.product.domain.Product;
import org.company.modules.product.domain.ProductRepository;
import org.company.modules.recurring_order.application.web.RecurringOrderDto;
import org.company.modules.recurring_order.domain.RecurringOrder;
import org.company.modules.user.application.UserAssembler;
import org.company.modules.user.domain.User;
import org.company.modules.user.domain.UserRepository;
import org.company.shared.aplication.IAssembler;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class RecurringOrderAssembler implements IAssembler<RecurringOrder, RecurringOrderDto> {
    private final AddressRepository addressRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ProductAssembler productAssembler;
    private final UserAssembler userAssembler;
    private final AddressAssembler addressAssembler;
    @Override
    public RecurringOrderDto toDto(RecurringOrder recurringOrder) {
        RecurringOrderDto recurringOrderDto  = new RecurringOrderDto();
        recurringOrderDto.setId(recurringOrder.getId());
        recurringOrderDto.setAddressStart(addressAssembler.toDto(recurringOrder.getAddressStart()));
        recurringOrderDto.setAddressEnd(addressAssembler.toDto(recurringOrder.getAddressEnd()));
        recurringOrderDto.setQuantity(recurringOrder.getQuantity());
        recurringOrderDto.setFrequency(recurringOrder.getFrequency());
        recurringOrderDto.setStartDate(recurringOrder.getStartDate());
        recurringOrderDto.setCustomer(userAssembler.toDto(recurringOrder.getCustomer()));
        recurringOrderDto.setProduct(productAssembler.toDto(recurringOrder.getProduct()));
        return recurringOrderDto;
    }

    @Override
    public void toEntity(RecurringOrderDto entityDto, RecurringOrder entity) {
        updateAddress(entityDto, entity);
        entity.setFrequency(entityDto.getFrequency());
        entity.setStartDate(entityDto.getStartDate());
        entity.setQuantity(entityDto.getQuantity());
        updateCustomer(entityDto, entity);
        updateProduct(entityDto, entity);
    }
    private void updateAddress(RecurringOrderDto recurringOrderDto, RecurringOrder recurringOrder) {
        Address addressStart = addressRepository.findById(recurringOrderDto.getAddressStart().getId()).orElseThrow(null);
        recurringOrder.setAddressStart(addressStart);
        Address addressEnd = addressRepository.findById(recurringOrderDto.getAddressEnd().getId()).orElseThrow(null);
        recurringOrder.setAddressEnd(addressEnd);
    }

    private void updateProduct( RecurringOrderDto recurringOrderDto, RecurringOrder recurringOrder) {
        Product product = productRepository.findById(recurringOrderDto.getProduct().getId()).orElseThrow(null);
        recurringOrder.setProduct(product);
    }
    private void updateCustomer( RecurringOrderDto recurringOrderDto, RecurringOrder recurringOrder) {
        User user = userRepository.findById(recurringOrderDto.getCustomer().getId()).orElseThrow(null);
        recurringOrder.setCustomer(user);
    }
}
