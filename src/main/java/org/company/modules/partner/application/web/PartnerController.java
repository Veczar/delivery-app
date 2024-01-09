package org.company.modules.partner.application.web;

import jakarta.servlet.http.Part;
import org.company.modules.auth.web.RegisterPartnerDto;
import org.company.modules.partner.application.PartnerService;
import org.company.shared.aplication.web.GenericController;
import org.company.shared.aplication.web.IController;
import org.company.shared.photos.PhotoService;
import org.company.shared.photos.PhotoType;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("api/partners")
public class PartnerController implements IController {
    public final PartnerService service;
    private final PhotoService photoService;
    public PartnerController(PartnerService service, PhotoService photoService) {
        this.service = service;
        this.photoService = photoService;
    }

    @GetMapping("/read")
    public List<PartnerReadDto> getReadDtoPartners(){
        return service.getPartnersReadDto();
    }
    @GetMapping
    public List<PartnerDto> getAllItems() {
        return service.getAllItems();
    }

    @GetMapping("/{id}")
    public PartnerDto getItem(@PathVariable Long id) {
        return service.getItem(id);
    }

    @DeleteMapping("/{id}")
    public PartnerDto removeItem(@PathVariable Long id) {
        return service.removeItem(id);
    }

    @PostMapping
    public PartnerDto createItem(@RequestPart("photo") MultipartFile photo,
                                 @RequestPart(name = "partner") PartnerDto partnerDto) {
        return service.saveItem(photo, partnerDto);
    }

    @PutMapping("/{id}")
    public PartnerDto updateItem(@PathVariable Long id, @RequestBody PartnerDto user) {
        return service.updateItem(id, user);
    }

    @GetMapping("/name/{name}")
    public PartnerDto getPartnerByName(@PathVariable String name) {
        return service.getPartnerByName(name);
    }
    @GetMapping("/photo/{photoName}")
    public ResponseEntity<byte []> getPhoto(@PathVariable String photoName) {
        byte [] photo = photoService.readPhoto(PhotoType.partner, photoName);
        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.CONTENT_TYPE, photoService.getMediaType(photoName))
                .body(photo);
    }
}
