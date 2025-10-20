package com.project.JSpotlight;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/photos")
@CrossOrigin(origins = "*")
public class ResponseController {
    private static final String UPLOAD_DIR = "uploads";

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private ImageTaggingService taggingService;

    @PostMapping("/upload")
    public ResponseEntity<Photo> uploadPhoto(@RequestParam("file") MultipartFile file) throws IOException {
        if (!new File(UPLOAD_DIR).exists()) {
            new File(UPLOAD_DIR).mkdirs();
        }
        String filePath = UPLOAD_DIR + "/" + UUID.randomUUID() + "_" + file.getOriginalFilename();
        Files.copy(file.getInputStream(), Paths.get(filePath));

        Photo photo = new Photo();
        photo.setFileName(file.getOriginalFilename());
        photo.setCreationDate(new Date());
        photo.setFilePath(filePath);

        List<String> tags = taggingService.getTagsForImage(filePath);
        photo.setTags(tags);

        photoRepository.save(photo);
        return ResponseEntity.ok(photo);
    }

    @GetMapping
    public List<Photo> getAllPhotos() {
        return photoRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePhoto(@PathVariable Long id) {
        Optional<Photo> photo = photoRepository.findById(id);
        if (photo.isPresent()) {
            // Delete the physical file
            try {
                Files.deleteIfExists(Paths.get(photo.get().getFilePath()));
            } catch (IOException e) {
                // Log error but continue with database deletion
            }
            photoRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Add update/search endpoints as needed
}
