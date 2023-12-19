package org.company.modules.product_delivery.application;

import lombok.AllArgsConstructor;
import org.company.modules.address.domain.AddressRepository;
import org.company.modules.category.domain.CategoryRepository;
import org.company.modules.delivery_man.domain.DeliveryManRepository;
import org.company.modules.order.application.OrderAssembler;
import org.company.modules.order.domain.Order;
import org.company.modules.order.domain.OrderRepository;
import org.company.modules.partner.domain.PartnerRepository;
import org.company.modules.product_delivery.application.web.ProductOrderDto;
import org.company.modules.product_delivery.domain.ProductOrder;
import org.company.modules.product.application.ProductAssembler;
import org.company.modules.product.domain.Product;
import org.company.modules.product.domain.ProductRepository;
import org.company.modules.product_delivery.domain.ProductOrderPk;
import org.company.modules.role.application.RoleAssembler;
import org.company.modules.role.domain.RoleRepository;
import org.company.modules.user.domain.UserRepository;
import org.company.shared.aplication.IAssembler;
import org.springframework.stereotype.Component;
@AllArgsConstructor
@Component
public class ProductOrderAssembler implements IAssembler<ProductOrder, ProductOrderDto> {
    private ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final RoleAssembler roleAssembler;
    private final RoleRepository roleRepository;
    private final CategoryRepository categoryRepository;
    private final DeliveryManRepository deliveryManRepository;
    private final PartnerRepository partnerRepository;

    @Override
    public ProductOrderDto toDto(ProductOrder productOrder) {
        ProductAssembler productAssembler = new ProductAssembler();
        OrderAssembler orderAssembler = new OrderAssembler(addressRepository, userRepository, roleAssembler, roleRepository, categoryRepository, deliveryManRepository, partnerRepository);
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
