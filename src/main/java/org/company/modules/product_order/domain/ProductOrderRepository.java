package org.company.modules.product_order.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductOrderRepository extends JpaRepository<ProductOrder, ProductOrderPk> {
    List<ProductOrder> findByOrder_Customer_Id(Long customerId);
}
