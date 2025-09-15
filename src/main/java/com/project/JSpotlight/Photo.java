package com.project.JSpotlight;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String creationDate;
    private String filePath;
    private String tags;


    // JPA requires a no-argument constructor
    public Photo() {
    }

    public Photo(String fileName, String creationDate) {
        this.fileName = fileName;
        this.creationDate = creationDate;
    }

    // --- Getters ---
    public Long getId() {
        return id;
    }

    public String getFileName() {
        return fileName;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public String getFilePath() {
        return filePath;
    }

    public String getTags() {
        return tags;
    }


    // --- Setters ---
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }
}