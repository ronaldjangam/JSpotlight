package com.project.JSpotlight;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.VBox;
import javafx.stage.FileChooser;
import javafx.stage.Stage;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Path;
import java.time.LocalDate;

// Note: The main method has been removed from this file.
public class Main extends Application {

    private final HttpClient httpClient = HttpClient.newHttpClient();

    @Override
    public void start(Stage primaryStage) {
        primaryStage.setTitle("JSpotlight Uploader");
        Button uploadButton = new Button("Upload Photo");

        uploadButton.setOnAction(e -> {
            FileChooser fileChooser = new FileChooser();
            fileChooser.setTitle("Select Photo to Upload");
            File file = fileChooser.showOpenDialog(primaryStage);
            if (file != null) {
                try {
                    uploadPhoto(file);
                } catch (IOException | InterruptedException ex) {
                    System.err.println("Upload failed: " + ex.getMessage());
                    ex.printStackTrace();
                }
            }
        });

        VBox vbox = new VBox(uploadButton);
        Scene scene = new Scene(vbox, 200, 100);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    private void uploadPhoto(File file) throws IOException, InterruptedException {
        String creationDate = LocalDate.now().toString();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:8080/photos?creationDate=" + creationDate))
                .POST(HttpRequest.BodyPublishers.ofFile(Path.of(file.getAbsolutePath())))
                .header("Content-Type", "image/jpeg")
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println("Upload complete!");
        System.out.println("Response status code: " + response.statusCode());
        System.out.println("Response body: " + response.body());
    }
}