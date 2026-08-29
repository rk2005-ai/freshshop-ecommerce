# 🚀 Complete Spring Boot + MySQL Backend Cloud Deployment Guide

This guide explains how to deploy your full Spring Boot application along with MySQL database to the cloud for free or on your own VPS.

---

## 🌟 Method 1: Deploy on Render (Recommended - Free Cloud Hosting)

Render provides free hosting for web services and managed databases.

### Step 1: Push Your Code to GitHub
1. Create a repository on GitHub (e.g. `freshshop-ecommerce`).
2. Push your project code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit with cloud deployment files"
   git remote add origin https://github.com/YOUR_USERNAME/freshshop-ecommerce.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Render via Blueprint
1. Go to **[https://dashboard.render.com](https://dashboard.render.com)** and log in with GitHub.
2. Click **"New +"** (top right) ➔ Select **"Blueprint"**.
3. Connect your `freshshop-ecommerce` repository.
4. Render will automatically read [`render.yaml`](file:///c:/Users/HP/Downloads/E-commerce-project-springBoot-master2/E-commerce-project-springBoot-master2/render.yaml), provision:
   - **MySQL Database**: `freshshop-mysql`
   - **Web Service**: `freshshop-backend` (running your Spring Boot JAR)
5. Click **"Apply"** — Render builds your container and outputs your live HTTPS link (e.g. `https://freshshop-backend.onrender.com`)!

---

## 🚂 Method 2: Deploy on Railway (1-Click)

1. Go to **[https://railway.app](https://railway.app)** and log in with GitHub.
2. Click **"New Project"** ➔ **"Deploy from GitHub repo"**.
3. Select your repository.
4. In your Railway project canvas, click **"+ New"** ➔ **"Database"** ➔ **"Add MySQL"**.
5. Railway automatically injects `MYSQL_URL`, `MYSQLUSER`, `MYSQLPASSWORD`, and `PORT` into your Spring Boot app via our pre-configured `application-prod.properties`!
6. Click **"Generate Domain"** under your web service settings to get your live public URL!

---

## 🐳 Method 3: Deploy on Any VPS / Cloud Server (AWS, DigitalOcean, Linode)

If you have a Linux cloud server / VPS with Docker installed:

1. SSH into your server:
   ```bash
   ssh root@YOUR_SERVER_IP
   ```
2. Clone your repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/freshshop-ecommerce.git
   cd freshshop-ecommerce
   ```
3. Run with Docker Compose:
   ```bash
   docker-compose up -d --build
   ```
4. Check running status:
   ```bash
   docker-compose ps
   ```
5. Your application is live at:
   ```
   http://YOUR_SERVER_IP:8081/
   ```

---

## ⚙️ Environment Variables Reference:

| Variable | Description | Default Fallback |
| :--- | :--- | :--- |
| `PORT` | Web server listening port | `8081` |
| `SPRING_PROFILES_ACTIVE` | Spring active profile | `prod` |
| `SPRING_DATASOURCE_URL` | MySQL JDBC connection string | `jdbc:mysql://localhost:3306/ecommjava` |
| `SPRING_DATASOURCE_USERNAME` | MySQL database username | `root` |
| `SPRING_DATASOURCE_PASSWORD` | MySQL database password | `123456` |

---

## 🔑 Default Admin & Customer Logins:

| Role | Username | Password |
| :--- | :--- | :--- |
| 🛡️ **Admin Portal** | `admin` | `123` |
| 🛒 **Customer Account** | `lisa` | `765` |
