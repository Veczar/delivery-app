package org.company.modules.product_order.application;

import org.company.modules.product_order.application.web.ProductOrderDto;
import org.company.modules.product_order.domain.ProductOrder;
import org.company.modules.product_order.domain.ProductOrderPk;
import org.company.modules.product_order.domain.ProductOrderRepository;
import org.company.shared.aplication.GenericService;
import org.springframework.stereotype.Service;

@Service
public class ProductOrderService extends GenericService<ProductOrder, ProductOrderDto, ProductOrderPk, ProductOrderRepository, ProductOrderAssembler> {
    public ProductOrderService(ProductOrderRepository repository, ProductOrderAssembler assembler) {
        super(repository, assembler);
    }
}
