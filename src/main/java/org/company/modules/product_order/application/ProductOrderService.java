package org.company.modules.product_order.application;

import org.company.modules.order.application.web.OrderReadDto;
import org.company.modules.product_order.application.web.ProductOrderDto;
import org.company.modules.product_order.domain.ProductOrder;
import org.company.modules.product_order.domain.ProductOrderPk;
import org.company.modules.product_order.domain.ProductOrderRepository;
import org.company.shared.aplication.GenericService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductOrderService extends GenericService<ProductOrder, ProductOrderDto, ProductOrderPk, ProductOrderRepository, ProductOrderAssembler> {
    public ProductOrderService(ProductOrderRepository repository, ProductOrderAssembler assembler) {
        super(repository, assembler);
    }
    public List<ProductOrderDto> getAllWithByCustomerId(@PathVariable Long id)
    {

        List<ProductOrderDto> list = repository.findByOrder_Customer_Id(id)
                .stream()
                .map(assembler::toDto)
                .collect(Collectors.toList());
        return list;
    }
}
