package com.project.JSpotlight;

import org.datavec.image.loader.NativeImageLoader;
import org.deeplearning4j.nn.graph.ComputationGraph;
import org.deeplearning4j.zoo.PretrainedType;
import org.deeplearning4j.zoo.ZooModel;
import org.deeplearning4j.zoo.model.VGG16;
import org.deeplearning4j.util.ImageNetLabels;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.nd4j.linalg.dataset.api.preprocessor.ImagePreProcessingScaler;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class ImageTaggingService {

    private ComputationGraph vgg16;

    public ImageTaggingService() {
        try {
            System.out.println("Loading VGG16 model... This may take a while.");
            ZooModel zooModel = VGG16.builder().build();
            vgg16 = (ComputationGraph) zooModel.initPretrained(PretrainedType.IMAGENET);
            System.out.println("Model loaded successfully.");
        } catch (IOException e) {
            System.err.println("Failed to load the VGG16 model.");
            e.printStackTrace();
        }
    }

    public String generateTags(File imageFile) throws IOException {
        if (vgg16 == null) {
            return "Model not loaded";
        }

        NativeImageLoader loader = new NativeImageLoader(224, 224, 3);
        INDArray image = loader.asMatrix(imageFile);
        ImagePreProcessingScaler scaler = new ImagePreProcessingScaler(0, 1);
        scaler.transform(image);

        INDArray[] output = vgg16.output(image);
        ImageNetLabels imageNetLabels = new ImageNetLabels();

        List<String> labels = imageNetLabels.getLabels(output[0]);

        return String.join(", ", labels);
    }
}