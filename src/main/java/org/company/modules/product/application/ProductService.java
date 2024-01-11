package org.company.modules.product.application;

import org.company.modules.product.application.web.ProductDto;
import org.company.modules.product.application.web.ProductReadDto;
import org.company.modules.product.domain.Product;
import org.company.modules.product.domain.ProductRepository;
import org.company.shared.aplication.GenericService;
import org.company.shared.photos.PhotoService;
import org.company.shared.photos.PhotoType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class ProductService extends GenericService<Product, ProductDto, Long,  ProductRepository, ProductAssembler>
{
    private final ProductRepository productRepository;
    private final ProductAssembler productAssembler;
    private final PhotoService photoService;
    
    public ProductService(ProductRepository productRepository, ProductAssembler productAssembler, PhotoService photoService)
    {
        super(productRepository,productAssembler);
        this.productRepository = productRepository;
        this.productAssembler = productAssembler;
        this.photoService = photoService;
    }
    
    public List<ProductReadDto> productsFromPartner(String partnerName) {
        return productRepository.findByPartnerName(partnerName)
                .stream().map(productAssembler::toReadDto).collect(Collectors.toList());
    }


    public ProductDto saveItem(MultipartFile photo, ProductDto productDto) {
        productDto.setPhotoPath(photoService.savePhoto(photo, PhotoType.product));
        return super.saveItem(productDto);
    }
    
    @Override
    public ProductDto removeItem(Long id) {
        ProductDto productDto = super.removeItem(id);
        photoService.removePhoto(PhotoType.product, productDto.getPhotoPath());
        return productDto;
    }
}
