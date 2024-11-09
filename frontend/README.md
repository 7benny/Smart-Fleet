# 🚚 Smart Fleet Management System 🚀

Welcome to the **Smart Fleet Management System**! This application offers a comprehensive solution for managing vehicle fleets in real-time, providing features like vehicle tracking, maintenance scheduling, and analytics.

---

## 🌟 Features

- **User Authentication** 🔐: Secure user registration and login with JWT.
- **Vehicle Management** 🚗: Add, edit, and delete vehicles in your fleet.
- **Real-Time Updates** ⚡: Instant updates on vehicle status using Socket.io.
- **Live Tracking** 🛰️: Visualize vehicle locations on an interactive map.
- **Responsive UI** 🎨: User-friendly interface built with React and Material-UI.
- **RESTful API** 🌐: Robust backend API built with Node.js and Express.

---

## 🛠️ Technologies Used

### Frontend 🖥️

- **React.js**
- **Material-UI**
- **Axios**
- **React Router**
- **Socket.io Client**
- **React Leaflet**

### Backend 🖧

- **Node.js**
- **Express.js**
- **Sequelize (PostgreSQL)**
- **Socket.io**
- **JSON Web Tokens (JWT)**
- **Bcrypt.js**

---

## 📦 Installation

### Prerequisites

- **Node.js** (v12 or higher)
- **npm** (v6 or higher)
- **PostgreSQL** (for the database)
- **Git** (optional)

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/smart-fleet-management.git
   ```

2. **Navigate to the Backend Directory**

   ```bash
   cd smart-fleet-management/backend
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Configure Environment Variables**

   Create a `.env` file in the `backend` directory with the following content:

   ```env
   PORT=5001
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   JWT_SECRET=your_jwt_secret
   ```

5. **Set Up the Database**

   - Create a PostgreSQL database matching the `DB_NAME` in your `.env` file.
   - Update your database credentials in the `.env` file.

6. **Start the Backend Server**

   ```bash
   npm run dev
   ```

   The backend server should now be running on `http://localhost:5001`.

### Frontend Setup

1. **Navigate to the Frontend Directory**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the `frontend` directory with the following content:

   ```env
   REACT_APP_API_URL=http://localhost:5001
   ```

4. **Start the Frontend Server**

   ```bash
   npm start
   ```

   The frontend application should now be running on `http://localhost:3000`.

---

## 🚀 Usage

### Register a New User

1. Open your browser and navigate to `http://localhost:3000`.
2. Click on the **Register** link in the navigation bar.
3. Fill out the registration form and submit.

### Log In

1. After registration, you will be redirected to the login page.
2. Enter your credentials and log in.

### Manage Vehicles

- **Add Vehicle**: Click on the **Add Vehicle** button and fill out the form.
- **Edit Vehicle**: Click the edit icon ✏️ on a vehicle card to update its details.
- **Delete Vehicle**: Click the delete icon 🗑️ to remove a vehicle from your fleet.
- **View Map**: See all your vehicles displayed on an interactive map.

---

## 🔗 API Endpoints

### Authentication

- **POST** `/register` 📥: Register a new user.
- **POST** `/login` 🔑: Authenticate a user and receive a JWT token.

### Vehicles

- **GET** `/vehicles` 🚚: Get all vehicles for the authenticated user.
- **POST** `/vehicles` ➕: Add a new vehicle.
- **PUT** `/vehicles/:id` ♻️: Update vehicle details.
- **DELETE** `/vehicles/:id` ❌: Delete a vehicle.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository** 🍴
2. **Create a new branch** 🚧
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. **Commit your changes** 💾
   ```bash
   git commit -m "Add some feature"
   ```
4. **Push to the branch** 🚀
   ```bash
   git push origin feature/YourFeatureName
   ```
5. **Open a Pull Request** 📬

---

*Made with ❤️ by Benny Kumpati*