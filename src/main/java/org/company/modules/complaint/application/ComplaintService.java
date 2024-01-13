package org.company.modules.complaint.application;

import org.company.modules.complaint.application.domain.ComplaintDto;
import org.company.modules.complaint.application.domain.ComplaintReadDto;
import org.company.modules.complaint.web.Complaint;
import org.company.modules.complaint.web.ComplaintRepository;
import org.company.modules.order.application.web.OrderReadDto;
import org.company.modules.order.domain.Order;
import org.company.modules.order.domain.OrderSpecifications;
import org.company.shared.aplication.GenericService;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class ComplaintService extends GenericService<Complaint, ComplaintDto, Long, ComplaintRepository, ComplaintAssembler> {
    public ComplaintService(ComplaintRepository repository, ComplaintAssembler assembler) {
        super(repository, assembler);
    }
    @Override
    public ComplaintDto saveItem(ComplaintDto complaintDto)
    {
        complaintDto.setCreationDate(new Date());
    return  super.saveItem(complaintDto);
    }
    public List<ComplaintReadDto> getComplaintsRead() {
        List<ComplaintReadDto> list = repository.findAll()
                .stream()
                .map(assembler::toReadDto)
                .collect(Collectors.toList());
        return list;
    }
}
