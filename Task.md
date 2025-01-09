# Features need to be added

1. Extension -> similar to the Milenots
    if : access required
            -  Access your data for all websites
            -  Access browser tabs

    if :    user is use the extension
    true : serve the extension functionallity
    false : sign up in the application
            then login in the extension



## making scalable and reduce the computation using JWT token

### Drawback of the tradition sever-side-session-management
1. Scalability Issues:
    Maintaining sessions across multiple servers in a distributed system requires additional mechanisms like session replication.

2. Less Flexibility:
    Session-based systems are tightly coupled to the backend, making them less suitable for modern architectures like microservices.

3. Vulnerable to CSRF (Cross-Site Request Forgery):
    Cookies used in session-based authentication are prone to CSRF attacks if not secured properly.


### JWT-Based Authentication: How It Works

    - A user logs in with credentials.
    - The server validates the credentials and generates a JWT token.
    - The token is sent to the client and stored (typically in localStorage or sessionStorage).
    - For subsequent requests, the client sends the JWT token in the Authorization header.
    - The server verifies the token without needing to store session data.

1.  Stateless Authentication
    How It Helps: The server does not need to store session data. The JWT itself contains all the information required for authentication.

2. Enhanced Security
    JWTs can be signed and optionally encrypted, ensuring:
        The data cannot be tampered with (integrity).
        The data cannot be read by unauthorized parties (confidentiality).



## Microservices
def : Microservices are an architectural approach to developing software applications as a collection of small, independent services that communicate with each other over a network.




# Microservices Architecture Documentation

## Overview

This documentation outlines the architecture for a multi-microservice application with PostgreSQL as the database and Prisma as the ORM. The application consists of the following microservices:

1. **Authentication Service**
2. **Clipping Service**
3. **Notification Service**
4. **File Storage Service**
5. **Analytics Service**

Each microservice interacts with its own set of database tables (schemas) within the PostgreSQL database.

---

## 1. Authentication Service

### **Use**
Handles user authentication, registration, and session management.

### **Endpoints**

- **POST /auth/signin**
  Registers a new user.

  Request Body:
  ```json
  {
    "email": "user@example.com",
    "password": "strongpassword"
  }
  ```

  Response:
  ```json
  {
    "message": "User registered successfully",
    "userId": "uuid"
  }
  ```

- **POST /auth/login**
  Logs in a user and returns a JWT token.

  Request Body:
  ```json
  {
    "email": "user@example.com",
    "password": "strongpassword"
  }
  ```

  Response:
  ```json
  {
    "token": "jwt-token",
    "userId": "uuid"
  }
  ```

- **POST /auth/logout**
  Logs out a user by invalidating their session.

  Request Body:
  ```json
  {
    "userId": "uuid"
  }
  ```

  Response:
  ```json
  {
    "message": "User logged out successfully"
  }
  ```

### **Prisma Schema**

```prisma
// authentication/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String   @id @default(uuid())
  email         String   @unique
  passwordHash  String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  sessions      Session[]
}

model Session {
  id          String   @id @default(uuid())
  userId      String
  token       String
  expiresAt   DateTime
  user        User     @relation(fields: [userId], references: [id])
}
```

---

## 2. Clipping Service

### **Use**
Handles user-created clippings, including organizing them into folders and associating tags.

### **Endpoints**

- **POST /clipping**
  Create a new clipping.

  Request Body:
  ```json
  {
    "userId": "uuid",
    "title": "Clipping Title",
    "url": "http://example.com",
    "content": "Clipping content",
    "tags": ["tag1", "tag2"],
    "folderId": "folder-uuid"
  }
  ```

  Response:
  ```json
  {
    "message": "Clipping created successfully",
    "clippingId": "uuid"
  }
  ```

- **GET /clipping/{id}**
  Get details of a specific clipping.

  Response:
  ```json
  {
    "id": "uuid",
    "title": "Clipping Title",
    "url": "http://example.com",
    "content": "Clipping content",
    "tags": ["tag1", "tag2"],
    "folderId": "folder-uuid"
  }
  ```

- **GET /clippings**
  List all clippings for a user.

  Response:
  ```json
  [
    {
      "id": "uuid",
      "title": "Clipping Title",
      "url": "http://example.com",
      "content": "Clipping content",
      "tags": ["tag1", "tag2"],
      "folderId": "folder-uuid"
    }
  ]
  ```

### **Prisma Schema**

```prisma
// clipping/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Clipping {
  id        String   @id @default(uuid())
  userId    String
  title     String
  url       String
  content   String
  tags      Tag[]
  folderId  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id])
  folder    Folder?  @relation(fields: [folderId], references: [id])
}

model Tag {
  id        String     @id @default(uuid())
  name      String
  clippings Clipping[]
}

model Folder {
  id        String     @id @default(uuid())
  name      String
  clippings Clipping[]
}
```

---

## 3. Notification Service

### **Use**
Handles notifications for users (e.g., new clippings, updates).

### **Endpoints**

- **POST /notifications**
  Send a notification to a user.

  Request Body:
  ```json
  {
    "userId": "uuid",
    "message": "New clipping added"
  }
  ```

  Response:
  ```json
  {
    "message": "Notification sent successfully",
    "notificationId": "uuid"
  }
  ```

- **GET /notifications/{userId}**
  List all notifications for a user.

  Response:
  ```json
  [
    {
      "id": "uuid",
      "message": "New clipping added",
      "isRead": false,
      "createdAt": "2022-10-12T12:00:00Z"
    }
  ]
  ```

### **Prisma Schema**

```prisma
// notification/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Notification {
  id        String   @id @default(uuid())
  userId    String
  message   String
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
}
```

---

## 4. File Storage Service

### **Use**
Handles file uploads and file metadata storage.

### **Endpoints**

- **POST /files/upload**
  Upload a new file.

  Request Body (multipart):
  ```json
  {
    "file": "<file-data>"
  }
  ```

  Response:
  ```json
  {
    "message": "File uploaded successfully",
    "fileId": "uuid",
    "fileUrl": "http://example.com/files/uuid"
  }
  ```

- **GET /files/{fileId}**
  Get a specific file's metadata.

  Response:
  ```json
  {
    "fileId": "uuid",
    "fileUrl": "http://example.com/files/uuid",
    "fileSize": 1024
  }
  ```

### **Prisma Schema**

```prisma
// file-storage/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model File {
  id        String   @id @default(uuid())
  url       String
  size      Int
  createdAt DateTime @default(now())
}
```

---

## 5. Analytics Service

### **Use**
Handles user activity logging and analytics.

### **Endpoints**

- **POST /analytics/activity**
  Log a new user activity.

  Request Body:
  ```json
  {
    "userId": "uuid",
    "activity": "User saved a clipping"
  }
  ```

  Response:
  ```json
  {
    "message": "Activity logged successfully",
    "activityId": "uuid"
  }
  ```

- **GET /analytics/activities/{userId}**
  Get a list of activities for a user.

  Response:
  ```json
  [
    {
      "id": "uuid",
      "activity": "User saved a clipping",
      "createdAt": "2022-10-12T12:00:00Z"
    }
  ]
  ```

### **Prisma Schema**

```prisma
// analytics/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model ActivityLog {
  id        String   @id @default(uuid())
  userId    String
  activity  String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
}
```

---

## Conclusion

This documentation outlines the core microservices of your application, including their purpose, endpoints, and database schemas. Each service is modular and can be independently scaled, ensuring that the architecture remains flexible and production-ready.

This design supports efficient data flow and communication between services, making it easy to integrate with PostgreSQL and Prisma while keeping the codebase organized and maintainable.
