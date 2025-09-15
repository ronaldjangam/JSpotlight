package com.project.JSpotlight;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
public class ResponseController {

    private final PhotoRepository photoRepository;

    @Autowired
    public ResponseController(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    // GET all photos
    @GetMapping("/photos")
    public Iterable<Photo> getPhotos() {
        return photoRepository.findAll();
    }

    // POST (add) a new photo
    @PostMapping("/photos")
    public Photo addPhoto(@RequestBody Photo photo) {
        return photoRepository.save(photo);
    }

    // DELETE a photo by its ID
    @DeleteMapping("/photos/{id}")
    public ResponseEntity<Void> deletePhoto(@PathVariable Long id) {
        photoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // PUT (update) a photo by its ID
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