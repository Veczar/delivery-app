package org.company.modules.partner.application;

import jakarta.servlet.http.Part;
import org.company.modules.partner.application.web.PartnerDto;
import org.company.modules.partner.domain.Partner;
import org.company.modules.partner.domain.PartnerRepository;
import org.company.modules.partner.domain.PartnerSpecification;
import org.company.modules.user.application.UserService;
import org.company.shared.aplication.GenericService;
import org.springframework.data.jpa.domain.Specification;
import org.company.shared.photos.PhotoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


@Service
public class PartnerService extends GenericService<Partner, PartnerDto, Long, PartnerRepository, PartnerAssembler> {
    
    private final PartnerRepository partnerRepository;
    private final PartnerAssembler partnerAssembler;
    protected final UserService userService;
    protected final PhotoService photoService;
    public PartnerService(PartnerRepository repository, PartnerAssembler assembler, UserService userService, PhotoService photoService) {
        super(repository, assembler);
        this.partnerRepository = repository;
        this.partnerAssembler = assembler;
        this.userService = userService;
        this.photoService = photoService;
    }

    public List<PartnerDto> getPartnersFromCity(String city) {
        Specification<Partner> partnerSpecification = PartnerSpecification.partnersFromCity(city);
        return partnerRepository.findAll(partnerSpecification)
                .stream().map(partnerAssembler::toDto).collect(Collectors.toList());
    }

    public PartnerDto getPartnerByName(String name) {
        Partner partner = partnerRepository.findByName(name).orElse(null);
        return partnerAssembler.toDto(partner);
    }
    @Transactional
    public PartnerDto removeItem(Long id) {
        PartnerDto partnerDto = super.removeItem(id);
        photoService.removePhoto(partnerDto.getPhotoPath());
        userService.removeItem(partnerDto.getOwner().getId());
        return partnerDto;
    }
}
