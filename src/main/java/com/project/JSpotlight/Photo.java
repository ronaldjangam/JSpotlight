package com.project.JSpotlight;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private Date creationDate;
    private String filePath;

    @ElementCollection
    private List<String> tags;

    public Photo() { }

    public Long getId() { return id; }
    public String getFileName() { return fileName; }
    public Date getCreationDate() { return creationDate; }
    public String getFilePath() { return filePath; }
    public List<String> getTags() { return tags; }

    public void setFileName(String fileName) { this.fileName = fileName; }
    public void setCreationDate(Date creationDate) { this.creationDate = creationDate; }
    public void setFilePath(String filePath) { this.filePath = filePath; }
    public void setTags(List<String> tags) { this.tags = tags; }
}
