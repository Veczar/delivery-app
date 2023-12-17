package org.company.modules.partner.domain;

import org.company.modules.address.domain.Address;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface PartnerRepository extends JpaRepository<Partner, Long>, JpaSpecificationExecutor<Partner> {
    List<Partner> findByAddress(Address address);
    List<Partner> findAll(Specification<Partner> partnerSpecification);
}
