# Occamy Field Operations Tracking & Distribution Management System

## Demo

You can view a **working prototype demo** of the project here:

[Demo Video & Walkthrough](https://drive.google.com/drive/folders/1gdKUyzRwEFMaupUev07sZXaObuk39bBY?usp=sharing)

## Project Overview
**Occamy PS-1** is a **web-based and mobile-first internal system** built for **Occamy Bioscience**, a social enterprise operating across rural India. The system replaces unreliable WhatsApp-based tracking with a **structured, auditable, and data-driven workflow** for field officers and distributors.

Field officers travel daily to remote villages to:
- Meet farmers, sellers, and influencers
- Conduct one-on-one and group meetings
- Distribute nutraceutical samples
- Capture B2C and B2B sales
- Collect feedback

The system ensures **verifiable tracking, accountability, and analytics**, enabling admins to monitor field operations efficiently.

---

## Key Features

### 1. Attendance & Travel Tracking
- Daily check-in / check-out
- GPS-based travel logs
- Distance calculation per day
- Timestamped records for accountability

### 2. Meeting & Interaction Logging
- One-on-one and group meetings
- Auto-captured GPS locations
- Photo uploads and meeting notes
- Business potential estimation

### 3. Sample Distribution Tracking
- Capture product, quantity, recipient
- Track purpose: trial, demo, or follow-up
- Timestamp and location verification

### 4. Sales & Order Capture
- B2C: Direct farmer purchases
- B2B: Distributor/reseller purchases
- Track product SKU, pack size, quantity, and repeat orders

### 5. Admin Dashboard
- Visual analytics: charts, tables, maps
- Track attendance, distance traveled, meetings conducted
- Farmers contacted vs converted
- B2C vs B2B sales split
- State-wise, district-wise, and village-wise summaries

### 6. Authentication & Authorization
- Secure login system
- Role-based access control (Admin vs Field Officer)
- JWT-based authentication
- Protected routes/pages

---

## Tech Stack

| Layer       | Technology |
|------------|------------|
| Backend    | Python, Django, Django REST Framework |
| Frontend   | React, Axios, React Router, Bootstrap 5 |
| Database   | PostgreSQL |
| Auth       | JWT (SimpleJWT) |
| Maps       | Google Maps API / OpenStreetMap |
| Offline    | Local storage sync (offline-first) |
| Deployment | Can be hosted on Railway, Render, or Heroku |

---

## Project Structure

### Backend (`backend/`)

