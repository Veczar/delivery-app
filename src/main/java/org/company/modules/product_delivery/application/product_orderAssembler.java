package org.company.modules.product_delivery.application;

import lombok.AllArgsConstructor;
import org.company.modules.address.domain.AddressRepository;
import org.company.modules.order.application.OrderAssembler;
import org.company.modules.order.domain.Order;
import org.company.modules.order.domain.OrderRepository;
import org.company.modules.product_delivery.application.web.product_orderDto;
import org.company.modules.product_delivery.domain.product_order;
import org.company.modules.product.application.ProductAssembler;
import org.company.modules.product.domain.Product;
import org.company.modules.product.domain.ProductRepository;
import org.company.modules.product_delivery.domain.product_orderPk;
import org.company.modules.user.domain.UserRepository;
import org.company.shared.aplication.IAssembler;
import org.springframework.stereotype.Component;
@AllArgsConstructor
@Component
public class product_orderAssembler implements IAssembler<product_order, product_orderDto> {
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    @Override
    public product_orderDto toDto(product_order productOrder) {
        ProductAssembler productAssembler = new ProductAssembler();
        OrderAssembler orderAssembler = new OrderAssembler(addressRepository, userRepository);
        product_orderDto productOrderDto = new product_orderDto();
        productOrderDto.setProduct(productAssembler.toDto(productOrder.getProduct()));
        productOrderDto.setOrder(orderAssembler.toDto(productOrder.getOrder()));
        productOrderDto.setSubtotal(productOrder.getSubtotal());
        productOrderDto.setQuantity(productOrder.getQuantity());
        return productOrderDto;
    }

    @Override
    public void toEntity(product_orderDto productOrderDto, product_order productOrder) {
        updateProduct(productOrderDto, productOrder);
        updateOrder(productOrderDto, productOrder);
        productOrder.setId(new product_orderPk(productOrderDto.getProduct().getId(), productOrderDto.getOrder().getId()));
        productOrder.setQuantity(productOrderDto.getQuantity());
        productOrder.setSubtotal(productOrderDto.getSubtotal());
    }

    private void updateProduct(product_orderDto productOrderDto, product_order productOrder) {
        Product product = productRepository.findById(productOrderDto.getProduct().getId()).orElseThrow(null);
        productOrder.setProduct(product);
    }

    private void updateOrder(product_orderDto productOrderDto, product_order productOrder) {
        Order order = orderRepository.findById(productOrderDto.getOrder().getId()).orElseThrow(null);
        productOrder.setOrder(order);
    }
}
