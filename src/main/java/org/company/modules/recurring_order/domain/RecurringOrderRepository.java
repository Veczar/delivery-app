package org.company.modules.recurring_order.domain;

import org.company.modules.order.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecurringOrderRepository extends JpaRepository<RecurringOrder, Long> {
    List<RecurringOrder> findByCustomer_Id(Long customerId);
}
