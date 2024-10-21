# 📖 i-Book

## 📜 Project Description

**i-Book** is a modern social media platform that enables users to connect and interact anonymously with their friends and communities. This project aims to clone a social media website while introducing unique features that prioritize user privacy. Users can upload photos, videos, and locations, form groups, and engage with trending content in their area.

![Screenshot](https://user-images.githubusercontent.com/78680046/197323291-7bbfd05b-1398-4ff4-8a1b-e4dbb4bbf823.png)

## 📚 Table of Contents

1. [Installation Guide](#installation-guide)
2. [Features](#features)
3. [Contributing](#contributing)
4. [Acknowledgements](#acknowledgements)

## ⚙️ Installation Guide

To get started with the **i-Book** project, follow these steps:

### 1. Clone the Repository
Clone the project repository using:
```bash
git clone <repo_link>
```

### 2. Navigate to the Client Directory
```bash
cd client
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Create an Environment File
Create a `.env` file in the `client` directory and add the following lines:
```env
REACT_APP_PUBLIC_FOLDER=http://localhost:8000/images/
GENERATE_SOURCEMAP=false
REACT_APP_PATH_TO_BACKEND=http://localhost:8000
```

### 5. Start the Client
```bash
npm run start
```

### 6. Navigate to the API Directory
```bash
cd ../api
```

### 7. Install API Dependencies
```bash
npm install
```

### 8. Start the API
```bash
npm run start
```

---

## ✨ Features

| Feature               | Description                                          |
|----------------------|------------------------------------------------------|
| **Anonymous Interaction** | Users can interact within their friends circle without revealing their identities. |
| **Media Sharing**        | Upload photos and videos, and share locations with friends. |
| **Group Creation**       | Form and join groups to connect with like-minded individuals. |
| **Trending Content**     | View and engage with content that is trending around you. |

---

## 🤝 Contributing

We welcome contributions to the **i-Book** project! To contribute:

- Make sure to work on the **develop** branch only.
- Please do not clone or fork the **master** branch.
- To create a new branch for your contributions, use:
  ```bash
  git checkout -b <your_branch_name>
  ```
- Ensure that you follow the project guidelines for creating pull requests:
  - **Create pull requests for the `develop` branch only; other branches will be rejected.**

---

## 🙏 Acknowledgements

- This project was inspired by various social media platforms and aims to enhance user privacy and interaction.
- Special thanks to all contributors and the open-source community for their support and resources.
