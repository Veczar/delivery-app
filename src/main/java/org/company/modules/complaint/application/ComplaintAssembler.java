package org.company.modules.complaint.application;

import lombok.AllArgsConstructor;
import org.company.modules.complaint.application.domain.ComplaintDto;
import org.company.modules.complaint.application.domain.ComplaintReadDto;
import org.company.modules.complaint.web.Complaint;
import org.company.modules.user.application.UserAssembler;
import org.company.modules.user.domain.User;
import org.company.modules.user.domain.UserRepository;
import org.company.shared.aplication.IAssembler;
import org.hibernate.sql.Update;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ComplaintAssembler implements IAssembler<Complaint, ComplaintDto> {
    private final UserAssembler userAssembler;
    private final UserRepository userRepository;


    @Override
    public  ComplaintDto toDto(Complaint complaint) {
        ComplaintDto complaintDto = new ComplaintDto();
        complaintDto.setId(complaint.getId());
        complaintDto.setTitle(complaint.getTitle());
        complaintDto.setDescription(complaint.getDescription());
        complaintDto.setMethodOfContact(complaint.getMethodOfContact());
        complaintDto.setCreationDate(complaint.getCreationDate());
        complaintDto.setUser(userAssembler.toDto(complaint.getUser()));
        return complaintDto;
    }

    public ComplaintReadDto toReadDto(Complaint complaint) {
        ComplaintReadDto complainReadDto = new ComplaintReadDto();
        complainReadDto.setId(complaint.getId());
        complainReadDto.setTitle(complaint.getTitle());
        complainReadDto.setDescription(complaint.getDescription());
        complainReadDto.setMethodOfContact(complaint.getMethodOfContact());
        complainReadDto.setUserFirstName(complaint.getUser().getFirstName());
        complainReadDto.setUserLastName(complaint.getUser().getLastName());
        complainReadDto.setUserEmail(complaint.getUser().getEmail());
        complainReadDto.setUserTelephoneNumber(complaint.getUser().getTelephoneNumber());
        complainReadDto.setCreationDate(complaint.getCreationDate());
        return complainReadDto;
    }

    @Override
    public void toEntity(ComplaintDto complaintDto, Complaint complaint) {
        complaint.setId(complaintDto.getId());
        complaint.setTitle(complaintDto.getTitle());
        complaint.setDescription(complaintDto.getDescription());
        complaint.setMethodOfContact(complaintDto.getMethodOfContact());
        complaint.setCreationDate(complaintDto.getCreationDate());
        updateUser(complaintDto, complaint);
    }
    private void updateUser(ComplaintDto complaintDto, Complaint complaint)
    {
        User user = userRepository.findById(complaintDto.getUser().getId()).orElse(null);
        complaint.setUser(user);
    }
}
