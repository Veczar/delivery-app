package org.company.modules.complaint.application.domain;

import org.company.modules.complaint.application.ComplaintAssembler;
import org.company.modules.complaint.application.ComplaintService;
import org.company.shared.aplication.web.GenericController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("api/complaints")
public class ComplaintController extends GenericController<ComplaintDto, Long, ComplaintService> {

    public ComplaintController(ComplaintService service) {
        super(service);
    }
    @GetMapping("/read")
    public List<ComplaintReadDto> getAllReadItems()
    {
        return service.getComplaintsRead();
    }
}
