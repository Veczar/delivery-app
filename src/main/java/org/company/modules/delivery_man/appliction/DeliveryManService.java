package org.company.modules.delivery_man.appliction;

import org.company.modules.delivery_man.appliction.web.DeliveryManDto;
import org.company.modules.delivery_man.domain.DeliveryMan;
import org.company.modules.delivery_man.domain.DeliveryManRepository;
import org.company.shared.aplication.GenericService;
import org.springframework.stereotype.Service;

@Service
public class DeliveryManService extends GenericService<DeliveryMan, DeliveryManDto, DeliveryManRepository,DeliveryManAssembler> {
    public DeliveryManService(DeliveryManRepository repository, DeliveryManAssembler assembler) {
        super(repository, assembler);
    }
}

