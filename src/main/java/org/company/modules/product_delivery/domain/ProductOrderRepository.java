package org.company.modules.product_delivery.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductOrderRepository extends JpaRepository<ProductOrder, ProductOrderPk> {
}
