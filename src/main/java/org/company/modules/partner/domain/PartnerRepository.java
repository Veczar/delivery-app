package org.company.modules.partner.domain;

import org.company.modules.address.domain.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PartnerRepository extends JpaRepository<Partner, Long> {
    List<Partner> findByAddress(Address address);
}
