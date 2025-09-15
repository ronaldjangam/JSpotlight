# JSpotlight - A Photo Library API

JSpotlight is a backend service built with **Java** and the **Spring Boot** framework. It provides a complete REST API for managing a photo library, serving as a robust foundation for a full-stack photo management application. The service handles the creation, retrieval, updating, and deletion (CRUD) of photo metadata through a simple and powerful API.

---
## Features

* ✅ **Create Photo Records:** Add new photos to the library with a filename and creation date.
* ✅ **Read All Photos:** Retrieve a complete list of all photos stored in the database.
* ✅ **Update Photo Details:** Modify the information of an existing photo using its unique ID.
* ✅ **Delete a Photo:** Permanently remove a photo from the library using its unique ID.

---
## Tech Stack

* **Language:** [Java 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
* **Framework:** [Spring Boot 3](https://spring.io/projects/spring-boot)
    * **Spring Web:** For building RESTful APIs.
    * **Spring Data JPA:** For simplified database interaction.
* **Database:** [H2 In-Memory Database](https://www.h2database.com/html/main.html)
* **Build Tool:** [Apache Maven](https://maven.apache.org/)

---
## Prerequisites

Before you begin, ensure you have the following installed on your system:
* **Java Development Kit (JDK) 17 or later**
* **Apache Maven**
* An API testing tool like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

---
## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/JSpotlight.git](https://github.com/your-username/JSpotlight.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd JSpotlight
    ```
3.  **Run the application:**
    You can run the application using your favorite IDE by opening the `JSpotlightApplication.java` file and running the `main` method. Alternatively, you can run it from the terminal using Maven:
    ```bash
    mvn spring-boot:run
    ```
4.  The application will start and be accessible at `http://localhost:8080`.

---
## API Endpoints Guide

Here is a detailed guide to all available API endpoints.

### 1. Get All Photos
Retrieves a list of all photos in the database.

* **Method:** `GET`
* **URL:** `/photos`
* **Success Response (200 OK):**
    ```json
    [
        {
            "id": 1,
            "fileName": "san_francisco.jpg",
            "creationDate": "2025-04-15"
        },
        {
            "id": 2,
            "fileName": "tokyo.jpg",
            "creationDate": "2024-05-22"
        }
    ]
    ```

### 2. Add a New Photo
Creates a new photo record in the database.

* **Method:** `POST`
* **URL:** `/photos`
* **Request Body:**
    ```json
    {
      "fileName": "paris.jpg",
      "creationDate": "2023-07-14"
    }
    ```
* **Success Response (200 OK):** The newly created photo object, including its database-generated `id`.
    ```json
    {
        "id": 3,
        "fileName": "paris.jpg",
        "creationDate": "2023-07-14"
    }
    ```

### 3. Update an Existing Photo
Updates the details of a specific photo identified by its `id`.

* **Method:** `PUT`
* **URL:** `/photos/{id}` (e.g., `/photos/1`)
* **Request Body:**
    ```json
    {
      "fileName": "san_francisco_day.jpg",
      "creationDate": "2025-04-16"
    }
    ```
* **Success Response (200 OK):** The fully updated photo object.
    ```json
    {
        "id": 1,
        "fileName": "san_francisco_day.jpg",
        "creationDate": "2025-04-16"
    }
    ```

### 4. Delete a Photo
Deletes a specific photo identified by its `id`.

* **Method:** `DELETE`
* **URL:** `/photos/{id}` (e.g., `/photos/1`)
* **Success Response (204 No Content):** An empty response body indicating successful deletion.

---
## Accessing the H2 Database Console

This project uses an in-memory H2 database, which resets every time the application restarts. You can view the contents of the database through a web console.

1.  **URL:** `http://localhost:8080/h2-console`
2.  **JDBC URL:** Ensure the `JDBC URL` field is set to `jdbc:h2:mem:testdb`.
3.  Click **Connect** to view your tables and run queries.
