package org.company.shared.photos;

import jakarta.annotation.PostConstruct;
import org.company.modules.partner.application.web.PartnerDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class PhotoService{
    @Value("${app.photoPath}")
    private String directoryPathInConfig;
    private String directoryPath;
    private  Path path;
    @PostConstruct
    private void init()
    {

        directoryPath = System.getProperty("user.dir")+'\\'+directoryPathInConfig;
        path = Path.of(directoryPath).toAbsolutePath().normalize();
        Path tmpPath = Path.of(path.toString()+'\\'+PhotoType.partner).toAbsolutePath().normalize();
        if (!Files.exists(tmpPath)) {
            try {
                Files.createDirectories(tmpPath);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        tmpPath = Path.of(path.toString()+'\\'+PhotoType.product).toAbsolutePath().normalize();
        if (!Files.exists(tmpPath)) {
            try {
                Files.createDirectories(tmpPath);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public void removePhoto(String photoPath) {
        try {
            String test = directoryPath + '\\' + photoPath;
            Files.delete(Path.of(directoryPath + '\\' + photoPath));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    public String  savePhoto(MultipartFile photo, PhotoType photoType) {
        String orgName = photo.getOriginalFilename();
        String extension = orgName.substring(orgName.lastIndexOf("."));
        String photoPath  = photoType.toString() + '\\' + UUID.randomUUID().toString()+extension;
        Path targetLocation = path.resolve(directoryPath+'\\'+photoPath);
            try {
                Files.copy(photo.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        return photoPath;
    }
}
