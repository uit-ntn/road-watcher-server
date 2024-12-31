# Road Watcher - Back-End

This is the **Back-End** of the **Road Watcher** project, providing APIs to support a pothole detection application and related features such as user authentication, pothole data management, history logging, safe-route navigation, and map file downloads.

---

## Table of Contents
- [Introduction](#introduction)
- [Technologies](#technologies)
- [System Requirements](#system-requirements)
- [Setup Guide](#setup-guide)
  - [Environment Configuration](#environment-configuration)
  - [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction
**Road Watcher** is a project aimed at monitoring and detecting potholes on roads, helping to enhance traffic safety and driving experience. This **Back-End** is built using **Node.js** and **Express.js** to handle requests from the Android application (or any client), providing key functionalities such as:
- User management (sign-up, login, password reset, Google OAuth)
- Pothole data operations (create, read, update, delete, statistics, coordinate checks)
- Safe-route navigation (based on pothole data)
- History management
- Downloading `.mbtiles` map files for offline use

---

## Technologies
- **Node.js**: JavaScript runtime environment
- **Express.js**: Framework for routing and middleware
- **MongoDB**: NoSQL database (use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB instance)
- **JSON Web Tokens (JWT)**: For authentication and authorization
- **Passport.js**: For Google OAuth integration 
- **dotenv**: For environment variable management
- **morgan, cors**: Useful middleware for request logging and Cross-Origin Resource Sharing

---

## System Requirements
1. **Node.js** >= 14
2. **npm** or **yarn**
3. **MongoDB**:
   - Either a locally installed MongoDB or **MongoDB Atlas** (recommended).
4. A **.env** file to configure environment variables (see [Environment Configuration](#environment-configuration)).

---

## Setup Guide
### Environment Configuration
Create a `.env` file in the project’s root directory

```env
MONGO_URI=
JWT_SECRET=
PORT=5000
EMAIL_MAILER=smtp
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=
EMAIL_PASS=
EMAIL_PORT=
EMAIL_ENCRYPTION=
EMAIL_FROM="Road Watcher"
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```
### Running the Application
1. Install dependencies:
   ```bash
   npm install

2. Start the server
  node index.js

3. By default, the server will run at:
http://localhost:3000


## Contributing
Fork this repository, submit a Pull Request, or open an Issue to report bugs or suggest new features.
All contributions, ideas, and feedback are welcome to help improve this project.

## License
This project is licensed under the MIT License. See the LICENSE file for more information.






