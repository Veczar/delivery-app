package org.company.modules.recurring_order.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RecurringOrderRepository extends JpaRepository<RecurringOrder, Long> {
}
