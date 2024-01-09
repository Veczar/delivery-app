package org.company.modules.product.application.web;

import org.company.modules.product.application.ProductService;
import org.company.shared.aplication.web.IController;
import org.company.shared.photos.PhotoService;
import org.company.shared.photos.PhotoType;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;


@RestController
@RequestMapping("api/products")
public class ProductController implements IController {
    public final ProductService service;
    private final PhotoService photoService;
    public ProductController(ProductService service, PhotoService photoService) {
        this.service = service;
        this.photoService = photoService;
    }

    @GetMapping
    public List<ProductDto> getAllItems() {
        return service.getAllItems();
    }

    @GetMapping("/{id}")
    public ProductDto getItem(@PathVariable Long id) {
        return service.getItem(id);
    }

    @DeleteMapping("/{id}")
    public ProductDto removeItem(@PathVariable Long id) {
        return service.removeItem(id);
    }

    @PostMapping
    public ProductDto createItem(@RequestPart("photo") MultipartFile photo,
                                 @RequestPart(name = "product") ProductDto dto) {
        return service.saveItem(photo, dto);
    }

    @PutMapping("/{id}")
    public ProductDto updateItem(@PathVariable Long id, @RequestBody ProductDto productDto) {
        return service.updateItem(id, productDto);
    }
    @GetMapping("/from/{partnerName}")
    public List<ProductReadDto> productsFromPartner(@PathVariable String partnerName) {
        return service.productsFromPartner(partnerName);
    }
    @GetMapping("/photo/{photoName}")
    public ResponseEntity<byte []> getPhoto(@PathVariable String photoName) {
        byte [] photo = photoService.readPhoto(PhotoType.product, photoName);
        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.CONTENT_TYPE, photoService.getMediaType(photoName))
                .body(photo);
    }
}
