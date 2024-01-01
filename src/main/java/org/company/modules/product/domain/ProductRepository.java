package org.company.modules.product.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByPartnerId(Long partnerId);
    List<Product> findByPartnerName(String partnerName);
}
