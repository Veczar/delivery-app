package org.company.modules.seller.domain;

import org.company.modules.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerRepository extends JpaRepository<Seller, Long> {
}
