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

    // --- Setters ---
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }
}