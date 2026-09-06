from fastapi import FastAPI
from database.database import engine, Base
from models.user import User
from routers.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from models.profile import Profile
from routers.profile import router as profile_router
from routers.analytics import router as analytics_router
from models.resume import Resume
from routers.resume import router as resume_router
from routers.github_router import router as github_router

app = FastAPI(title="CareerPilot AI")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://career-pilot-ai-rust-two.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)
app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(analytics_router)
app.include_router(resume_router)
app.include_router(github_router)

@app.get("/")
def home():
    return {
        "message": "CareerPilot AI Backend is running!"
    }


@app.get("/test-db")
def test_database():
    try:
        with engine.connect() as connection:
            return {
                "status": "success",
                "message": "Database connected successfully!"
            }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }