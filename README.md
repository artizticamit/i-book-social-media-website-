# 📖 i-Book

## 📜 Project Description

**i-Book** is a modern social media platform that allows users to connect and interact with their friends and communities anonymously. This project is a clone of a popular social media website, with enhanced features for privacy-conscious users. Users can upload media (photos, videos), share locations, create groups, and engage with trending content in their region.

![Screenshot](https://user-images.githubusercontent.com/78680046/197323291-7bbfd05b-1398-4ff4-8a1b-e4dbb4bbf823.png)

## 📚 Table of Contents

1. [Installation Guide](#installation-guide)
2. [Features](#features)
3. [Contributing](#contributing)
4. [Acknowledgements](#acknowledgements)

---

## ⚙️ Installation Guide

There are two ways to get started with the **i-Book** project: either by running the app locally using **npm** or by building it using **Docker**. Follow the instructions for the setup method that works best for you.

### Option 1: Local Setup (NPM)

1. **Clone the Repository**  
   Clone the project repository using:
   ```bash
   git clone <repo_link>
   ```

2. **Navigate to the Client Directory**  
   ```bash
   cd client
   ```

3. **Install Dependencies**  
   ```bash
   npm install
   ```

4. **Create an Environment File**  
   Create a `.env` file in the `client` directory and add the following lines:
   ```env
   REACT_APP_PUBLIC_FOLDER=http://localhost:8000/images/
   GENERATE_SOURCEMAP=false
   REACT_APP_PATH_TO_BACKEND=http://localhost:8000
   ```

5. **Start the Client**  
   Run the following command to start the frontend:
   ```bash
   npm run start
   ```

6. **Navigate to the API Directory**  
   In a new terminal window, navigate to the `api` directory:
   ```bash
   cd ../api
   ```

7. **Install API Dependencies**  
   ```bash
   npm install
   ```

8. **Start the API**  
   Start the backend server by running:
   ```bash
   npm run start
   ```

### Option 2: Docker Setup

If you prefer working with Docker, follow these steps to run the application using Docker containers.

1. **Clone the Repository**  
   Clone the project repository using:
   ```bash
   git clone <repo_link>
   ```

2. **Navigate to the API Directory**  
   First, build and run the backend in a Docker container:
   ```bash
   cd api
   ```

3. **Build the API Docker Image**  
   Build the Docker image for the backend:
   ```bash
   docker build -t 'api-docker-image' .
   ```

4. **Run the API Container**  
   Start the backend container with the following command:
   ```bash
   docker run -p 8000:8000 'api-docker-image'
   ```

5. **Navigate to the Client Directory**  
   In another terminal window, navigate to the `client` directory:
   ```bash
   cd ../client
   ```

6. **Build the Client Docker Image**  
   Build the Docker image for the frontend:
   ```bash
   docker build -t 'client-docker-image' .
   ```

7. **Run the Client Container**  
   Start the frontend container with the following command:
   ```bash
   docker run -p 3000:3000 'client-docker-image'
   ```

---

## ✨ Features

| Feature               | Description                                          |
|-----------------------|------------------------------------------------------|
| **Anonymous Interaction** | Users can interact with their friends and communities while keeping their identities hidden. |
| **Media Sharing**        | Upload photos, videos, and share locations with your network. |
| **Group Creation**       | Form and join groups with people who share similar interests. |
| **Trending Content**     | Stay updated with popular content in your area and interact with it. |

---

## 🤝 Contributing

We encourage you to contribute to the **i-Book** project! Please follow the guidelines below to make contributions:

- **Fork the repository** and then clone it using:
  ```bash
  git clone <repo_link>
  ```

- **Work on the `develop` branch only.** Please do not clone or fork the `master` branch.  
  To create a new branch for your contributions, run:
  ```bash
  git checkout -b <your_branch_name>
  ```

- **Front-end contributions only:** Focus on making changes to the code in the `client` folder. No changes to the API are required unless otherwise requested.

- **Creating Pull Requests (PRs):**  
  - PRs should be made to the `develop` branch only. PRs to any other branches will be rejected.

---

## 🙏 Acknowledgements

- This project was inspired by several popular social media platforms but focuses on enhancing user privacy and interaction.
- Thanks to all contributors and the open-source community for their support and resources in making this project possible.
