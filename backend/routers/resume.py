
import os
import shutil

from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from database.database import SessionLocal
from models.resume import Resume
from models.profile import Profile

from utils.resume_analyzer import extract_text
from utils.skill_extractor import extract_skills
from utils.ats_score import calculate_score, generate_suggestions
from utils.roadmap_generator import generate_roadmap
from utils.gemini_ai import analyze_resume_with_ai


router = APIRouter(prefix="/resume", tags=["Resume"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload/{user_id}")
def upload_resume(
    user_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume = Resume(
        user_id=user_id,
        filename=file.filename,
        filepath=filepath
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return {
        "message": "Resume uploaded successfully",
        "filename": file.filename
    }


@router.get("/analyze/{user_id}")
def analyze_resume(user_id: int, db: Session = Depends(get_db)):

    resume = (
        db.query(Resume)
        .filter(Resume.user_id == user_id)
        .order_by(Resume.id.desc())
        .first()
    )

    if not resume:
        return {"message": "No resume found"}

    profile = (
        db.query(Profile)
        .filter(Profile.user_id == user_id)
        .first()
    )

    if not profile:
        return {"message": "Profile not found"}

    text = extract_text(resume.filepath)

    skills = extract_skills(text)

    ats = calculate_score(
        skills,
        profile.dream_job
    )

    suggestions = generate_suggestions(
        ats["missing_skills"]
    )

    return {
        "skills": skills,
        "ats_score": ats["score"],
        "level": ats["level"],
        "dream_job": profile.dream_job,
        "matched_skills": ats["matched_skills"],
        "missing_skills": ats["missing_skills"],
        "suggestions": suggestions
    }


@router.get("/roadmap/{user_id}")
def roadmap(user_id: int, db: Session = Depends(get_db)):

    profile = (
        db.query(Profile)
        .filter(Profile.user_id == user_id)
        .first()
    )

    # No profile yet
    if not profile:
        return {
            "dream_job": "",
            "next_skills": [],
            "has_profile": False,
            "has_skills": False,
            "message": "Add your dream job and skills to generate your personalized learning path."
        }

    dream_job = profile.dream_job or ""

    # Check whether a resume exists
    resume = (
        db.query(Resume)
        .filter(Resume.user_id == user_id)
        .order_by(Resume.id.desc())
        .first()
    )

    # Resume is required for generating the roadmap
    if not resume:
        return {
            "dream_job": dream_job,
            "next_skills": [],
            "has_profile": True,
            "has_skills": False,
            "resume_uploaded": False,
            "message": "Please upload your resume to generate your personalized learning path."
        }

    # Resume exists, so extract skills from it
    text = extract_text(resume.filepath)
    user_skills = extract_skills(text)

    roadmap_data = generate_roadmap(
        dream_job,
        user_skills
    )

    return roadmap_data


@router.get("/ai-analysis/{user_id}")
def ai_analysis(user_id: int, db: Session = Depends(get_db)):

    resume = (
        db.query(Resume)
        .filter(Resume.user_id == user_id)
        .order_by(Resume.id.desc())
        .first()
    )

    if not resume:
        return {
            "message": "Resume not uploaded"
        }

    text = extract_text(resume.filepath)

    feedback = analyze_resume_with_ai(text)

    return {
        "feedback": feedback
    }


@router.get("/latest/{user_id}")
def get_latest_resume(user_id: int, db: Session = Depends(get_db)):

    resume = (
        db.query(Resume)
        .filter(Resume.user_id == user_id)
        .order_by(Resume.id.desc())
        .first()
    )

    if not resume:
        return {
            "uploaded": False
        }

    return {
        "uploaded": True,
        "filename": resume.filename
    }
