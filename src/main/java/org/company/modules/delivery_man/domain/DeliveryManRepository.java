package org.company.modules.delivery_man.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryManRepository extends JpaRepository<DeliveryMan,Long> {
    DeliveryMan findByUser_Id(Long userId);
}
