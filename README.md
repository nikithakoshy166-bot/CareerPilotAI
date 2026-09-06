# CareerPilot AI

An AI-powered career guidance and placement preparation platform that helps students assess their career readiness, identify skill gaps, improve their resumes, and follow personalized learning roadmaps.

## 🚀 Live Demo

**Frontend:**
https://career-pilot-ai-rust-two.vercel.app/

**Backend API:**
https://careerpilotai-4y1k.onrender.com

**API Documentation (Swagger):**
https://careerpilotai-4y1k.onrender.com/docs

---

## ✨ Features

### 🔐 User Authentication

* User registration
* User login
* User-specific dashboard

### 👤 Profile Management

Users can provide:

* College
* Branch
* Year
* CGPA
* Dream Job

The dashboard displays profile completion progress.

### 📊 Career Score

Calculates a career readiness score based on the user's profile and career-related information.

### 💡 Career Recommendations

Provides recommendations based on the user's career readiness and current progress.

### 📄 Resume Upload & Analysis

Users can upload their resume and receive:

* Extracted skills
* ATS-style score
* Missing skills
* Resume improvement suggestions

### 🎯 Skill Gap Analysis

Compares the skills identified from the user's resume with the skills expected for their selected dream job.

### 🗺️ Learning Roadmap

Provides a learning roadmap based on the user's selected career and identifies important skills to focus on next.

### 🤖 AI Resume Feedback

Uses Google's Gemini AI to analyze resumes and provide feedback and improvement suggestions.

### 🐙 GitHub Analysis

Allows users to enter their GitHub username and analyze their GitHub profile and development activity.

---

## 🛠️ Technologies Used

### Frontend

* React
* Vite
* JavaScript
* React-Bootstrap
* Bootstrap Icons

### Backend

* Python
* FastAPI
* SQLAlchemy
* Uvicorn

### Database

* PostgreSQL
* Supabase

### AI

* Google Gemini API

### Resume Processing

* PDFPlumber
* Skill Extraction
* ATS Scoring

### Deployment

* Vercel — Frontend
* Render — Backend
* Supabase — Database

### Version Control

* Git
* GitHub

---

## 🏗️ Project Structure

```text
CareerPilotAI/
│
├── backend/
│   ├── database/
│   ├── models/
│   ├── routers/
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   ├── main.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── ...
│
├── .gitignore
└── README.md
```

---

## 🔄 Application Flow

```text
User
  ↓
Login / Register
  ↓
Create Profile
  ↓
Career Score
  ↓
Resume Upload
  ↓
Resume Analysis
  ↓
Skill Gap Analysis
  ↓
Learning Roadmap
  ↓
AI Resume Feedback
  ↓
GitHub Analysis
```

---

## ⚙️ Running the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/nikithakoshy166-bot/CareerPilotAI.git
cd CareerPilotAI
```

### 2. Backend Setup

Move into the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the `backend` folder and add the required environment variables.

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

### 3. Frontend Setup

Open another terminal and move into the frontend folder:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🔒 Environment Variables

Sensitive credentials such as database credentials and API keys are stored using environment variables and are not included in the repository.

Example:

```text
DATABASE_URL=your_database_url
GEMINI_API_KEY=your_gemini_api_key
```

**Do not commit `.env` files or API keys to GitHub.**
