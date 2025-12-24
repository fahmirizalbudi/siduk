<div align="center">
<a href="https://github.com/fahmirizalbudi/siduk" target="blank">
<img src="https://raw.githubusercontent.com/fahmirizalbudi/siduk/87edb861b685b928c67c78d97b7582c322c31bd5/frontend/public/logo.svg" width="280" alt="Logo" />
</a>

<br />
<br />

![](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

</div>

<br />

## 📂 SIDUK

Siduk is a application that designed for managing population or resident data <i>(Sistem Informasi Kependudukan)</i>. Built with Laravel as the backend and React for a dynamic user interface, this project aims to provide a fast and efficient way to handle structured data using MySQL. Key features include:

## 🖼️ Preview

![SIDUK](https://github.com/fahmirizalbudi/siduk/blob/main/siduk.png)

## ✨ Features

- **📊 Dashboard:** User-friendly dashboard to manage links.
- **🔐 Authentication:** Secure login and registration system.
- **👥 Resident Management:** Create, read, update, and delete resident data easily.
- **🔍 Search & Filter:** Efficient querying of data based on specific criteria.

## 👩‍💻 Tech Stack

- **Laravel**: A PHP web application framework with expressive, elegant syntax for backend logic and API.
- **React**: A JavaScript library for building user interfaces and single-page components.
- **MySQL**: An open-source relational database management system.

## 📦 Getting Started

To get a local copy of this project up and running, follow these steps.

### 🚀 Prerequisites

- **PHP** (v8.2 or higher) & **Composer**.
- **Node.js** & **NPM**.
- **MySQL** (or another supported SQL database).

## 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/fahmirizalbudi/siduk.git
   cd siduk
   ```

2. **Install dependencies:**

   ```bash
   #frontend
   cd frontend
   npm install

   #backend
   cd backend
   composer install
   cp .env .env.example
   php artisan key:generate
   ```

3. **Run migration:**

   ```bash
   php artisan migrate
   ```

4. **Start the development server:**

   ```bash
   #client
   npm run dev

   #server
   php artisan serve
   ```

## 📖 Usage

### ✔ Running the Website

> Use [http://localhost:8000](http://localhost:8000) to test the api in your Postman.

> Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📜 License

All rights reserved. This project is for educational purposes only and cannot be used or distributed without permission.
