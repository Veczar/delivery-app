package org.company.modules.product_order.application;

import lombok.AllArgsConstructor;
import org.company.modules.order.application.OrderAssembler;
import org.company.modules.order.domain.Order;
import org.company.modules.order.domain.OrderRepository;
import org.company.modules.product_order.application.web.ProductOrderDto;
import org.company.modules.product_order.domain.ProductOrder;
import org.company.modules.product.application.ProductAssembler;
import org.company.modules.product.domain.Product;
import org.company.modules.product.domain.ProductRepository;
import org.company.modules.product_order.domain.ProductOrderPk;
import org.company.shared.aplication.IAssembler;
import org.springframework.stereotype.Component;
@AllArgsConstructor
@Component
public class ProductOrderAssembler implements IAssembler<ProductOrder, ProductOrderDto> {
    private ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final ProductAssembler productAssembler;
    private final OrderAssembler orderAssembler;

    @Override
    public ProductOrderDto toDto(ProductOrder productOrder) {
        ProductOrderDto productOrderDto = new ProductOrderDto();
        productOrderDto.setProduct(productAssembler.toDto(productOrder.getProduct()));
        productOrderDto.setOrder(orderAssembler.toDto(productOrder.getOrder()));
        productOrderDto.setSubtotal(productOrder.getSubtotal());
        productOrderDto.setQuantity(productOrder.getQuantity());
        return productOrderDto;
    }

    @Override
    public void toEntity(ProductOrderDto productOrderDto, ProductOrder productOrder) {
        updateProduct(productOrderDto, productOrder);
        updateOrder(productOrderDto, productOrder);
        productOrder.setId(new ProductOrderPk(productOrderDto.getProduct().getId(), productOrderDto.getOrder().getId()));
        productOrder.setQuantity(productOrderDto.getQuantity());
        productOrder.setSubtotal(productOrderDto.getSubtotal());
    }

    private void updateProduct(ProductOrderDto productOrderDto, ProductOrder productOrder) {
        Product product = productRepository.findById(productOrderDto.getProduct().getId()).orElseThrow(null);
        productOrder.setProduct(product);
    }

    private void updateOrder(ProductOrderDto productOrderDto, ProductOrder productOrder) {
        Order order = orderRepository.findById(productOrderDto.getOrder().getId()).orElseThrow(null);
        productOrder.setOrder(order);
    }
}
