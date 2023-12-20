package org.company.modules.product_delivery.application.web;

import lombok.Getter;
import lombok.Setter;
import org.company.modules.order.application.web.OrderDto;
import org.company.modules.product.application.web.ProductDto;

@Getter
@Setter
public class ProductOrderDto {
    private ProductDto product;
    private OrderDto order;
    private int quantity;
    private Double subtotal;
}
