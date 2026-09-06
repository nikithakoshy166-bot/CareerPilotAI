from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import SessionLocal
from models.profile import Profile

router = APIRouter(prefix="/analytics", tags=["Analytics"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/career-score/{user_id}")
def career_score(user_id: int, db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == user_id).first()

    if not profile:
        return {"message": "Profile not found"}

    score = 0

    # CGPA (max 40)
    score += min((profile.cgpa / 10) * 40, 40)

    # Skills (max 30)
    skill_count = len(profile.skills.split(","))
    score += min(skill_count * 6, 30)

    # Interests (10)
    if profile.interests.strip():
        score += 10

    # Dream Job (20)
    if profile.dream_job.strip():
        score += 20

    return {
        "career_score": round(score, 1)
    }