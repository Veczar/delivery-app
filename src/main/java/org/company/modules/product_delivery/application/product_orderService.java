package org.company.modules.product_delivery.application;

import org.company.modules.product_delivery.application.web.product_orderDto;
import org.company.modules.product_delivery.domain.product_order;
import org.company.modules.product_delivery.domain.product_orderPk;
import org.company.modules.product_delivery.domain.product_orderRepository;
import org.company.shared.aplication.GenericService;
import org.springframework.stereotype.Service;

@Service
public class product_orderService extends GenericService<product_order, product_orderDto, product_orderPk, product_orderRepository, product_orderAssembler> {
    public product_orderService(product_orderRepository repository, product_orderAssembler assembler) {
        super(repository, assembler);
    }
}
