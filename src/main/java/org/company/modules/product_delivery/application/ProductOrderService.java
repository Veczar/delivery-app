package org.company.modules.product_delivery.application;

import org.company.modules.product_delivery.application.web.ProductOrderDto;
import org.company.modules.product_delivery.domain.ProductOrder;
import org.company.modules.product_delivery.domain.ProductOrderPk;
import org.company.modules.product_delivery.domain.ProductOrderRepository;
import org.company.shared.aplication.GenericService;
import org.springframework.stereotype.Service;

@Service
public class ProductOrderService extends GenericService<ProductOrder, ProductOrderDto, ProductOrderPk, ProductOrderRepository, ProductOrderAssembler> {
    public ProductOrderService(ProductOrderRepository repository, ProductOrderAssembler assembler) {
        super(repository, assembler);
    }
}
