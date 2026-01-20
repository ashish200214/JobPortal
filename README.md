<img width="960" height="504" alt="image" src="https://github.com/user-attachments/assets/fca0ad22-d188-40a0-8885-08f11ff4baa4" />


# Job Portal Application

A **Full Stack Job Portal Application** built using **Spring Boot** and **React.js**, enabling **Job Seekers** and **Recruiters** to interact through secure authentication, job posting, and job searching with filters.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User Registration & Login
* JWT-based authentication
* Role-based access (JOB_SEEKER, RECRUITER, ADMIN)
* Secure APIs using Spring Security

### 🧑‍💼 Recruiter

* Post new jobs
* Update job details
* Delete jobs
* View jobs posted by recruiter

### 👨‍🎓 Job Seeker

* View all jobs
* Search jobs by keyword
* Filter jobs by:

  * Location
  * Industry
  * Salary
* View job details

---

## 🛠 Tech Stack

### Backend

* Java
* Spring Boot
* Spring Security
* JWT
* JPA / Hibernate
* MySQL

### Frontend

* React.js
* React Router
* Axios
* HTML, CSS, JavaScript

### Tools

* Git & GitHub
* Maven
* Postman

---

## 🏗 Project Architecture

### Backend Structure

```
src/main/java/com/jobportal
 ├── controller
 ├── service
 ├── repository
 ├── entity
 ├── dto
 ├── security
 └── exception
```

### Frontend Structure

```
src
 ├── components
 ├── pages
 ├── services
 ├── App.jsx
 └── main.jsx
```

---

## 🗄 Database Design

### Tables

* `users`
* `roles`
* `jobs`
* `applications`

### ORM

* JPA/Hibernate for entity mapping
* Relationships using:

  * `@OneToMany`
  * `@ManyToOne`

---

## 📸 Screenshots

### 🔑 Login Page

![Login Page](screenshots/login.png)
<img width="960" height="504" alt="image" src="https://github.com/user-attachments/assets/9ad73254-588d-4c26-b64f-e30776ec0ca5" />
<img width="960" height="504" alt="image" src="https://github.com/user-attachments/assets/f8a18426-ce37-43a5-b7b5-59e66f6439cd" />

---

### 📝 Register Page

![Register Page](screenshots/register.png)
<img width="960" height="504" alt="image" src="https://github.com/user-attachments/assets/76bd7d10-6738-40b1-86b4-1a6c4682ed3f" />

---

### 🏠 Home / Job Listing Page

![Job Listing](screenshots/job-list.png)
<img width="960" height="504" alt="image" src="https://github.com/user-attachments/assets/cfd8938a-757a-4da4-a08f-da44e5bad668" />

---

### 🔍 Job Search & Filter

![Job Filter](screenshots/job-filter.png)
<img width="960" height="504" alt="image" src="https://github.com/user-attachments/assets/81028dc0-d370-432d-b226-da7f56d08b6f" />

---

### ➕ Recruiter – Post Job

![Post Job](screenshots/post-job.png)
<img width="960" height="504" alt="image" src="https://github.com/user-attachments/assets/31aa6658-8551-4898-9ce0-6cd3685c5ae5" />

---

## ⚙️ How to Run the Project

### Backend (Spring Boot)

1. Clone the repository
2. Configure MySQL in `application.properties`
3. Create database:

   ```sql
   CREATE DATABASE jobportal;
   ```
4. Run the application:

   ```bash
   mvn spring-boot:run
   ```
5. Backend URL:

   ```
   http://localhost:8080
   ```

---

### Frontend (React)

1. Navigate to frontend folder
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start application:

   ```bash
   npm run dev
   ```
4. Frontend URL:

   ```
   http://localhost:5173
   ```

---

## 🔗 API Endpoints (Sample)

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/api/auth/register` | Register user        |
| POST   | `/api/auth/login`    | Login user           |
| POST   | `/api/jobs`          | Post a job           |
| GET    | `/api/jobs`          | Get all jobs         |
| GET    | `/api/jobs/search`   | Search & filter jobs |
| DELETE | `/api/jobs/{id}`     | Delete job           |

---

## 📌 Future Enhancements

* Apply for job functionality
* Resume upload
* Admin dashboard
* Email notifications
* Docker & AWS deployment

---

## 👨‍💻 Author

**Ashish Gawali**
Full Stack Java Developer

---


