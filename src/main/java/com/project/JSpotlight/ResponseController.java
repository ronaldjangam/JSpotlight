package com.project.JSpotlight;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.util.Optional;

@RestController
public class ResponseController {

    // All three services are now declared as final fields
    private final PhotoRepository photoRepository;
    private final FileStorageService fileStorageService;
    private final ImageTaggingService imageTaggingService;

    // The constructor is updated to inject all three dependencies
    @Autowired
    public ResponseController(PhotoRepository photoRepository,
                              FileStorageService fileStorageService,
                              ImageTaggingService imageTaggingService) {
        this.photoRepository = photoRepository;
        this.fileStorageService = fileStorageService;
        this.imageTaggingService = imageTaggingService;
    }

    // GET all photos (Unchanged)
    @GetMapping("/photos")
    public Iterable<Photo> getPhotos() {
        return photoRepository.findAll();
    }

    // POST (add) a new photo by uploading a file (Updated with AI tagging)
    @PostMapping("/photos")
    public Photo addPhoto(@RequestParam("file") MultipartFile file,
                          @RequestParam("creationDate") String creationDate) {

        // 1. Store the file on the server
        String storedFileName = fileStorageService.storeFile(file);
        String filePath = new File("./uploads/" + storedFileName).getAbsolutePath();

        // 2. Generate real AI tags from the stored file
        String tags;
        try {
            tags = imageTaggingService.generateTags(new File(filePath));
        } catch (Exception e) {
            e.printStackTrace();
            tags = "Error during tagging";
        }

        // 3. Create and save the Photo entity
        Photo newPhoto = new Photo(file.getOriginalFilename(), creationDate);
        newPhoto.setFilePath(filePath);
        newPhoto.setTags(tags);

        return photoRepository.save(newPhoto);
    }

    // DELETE a photo by its ID (Unchanged)
    @DeleteMapping("/photos/{id}")
    public ResponseEntity<Void> deletePhoto(@PathVariable Long id) {
        photoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // PUT (update) a photo's metadata by its ID (Unchanged)
    @PutMapping("/photos/{id}")
    public ResponseEntity<Photo> updatePhoto(@PathVariable Long id, @RequestBody Photo updatedPhoto) {
        Optional<Photo> optionalPhoto = photoRepository.findById(id);
        if (optionalPhoto.isPresent()) {
            Photo photo = optionalPhoto.get();
            photo.setFileName(updatedPhoto.getFileName());
            photo.setCreationDate(updatedPhoto.getCreationDate());
            return ResponseEntity.ok(photoRepository.save(photo));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}