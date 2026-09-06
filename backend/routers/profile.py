from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import SessionLocal
from models.profile import Profile
from schemas.profile import ProfileCreate

router = APIRouter(prefix="/profile", tags=["Profile"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/create/{user_id}")
def create_profile(user_id: int, profile: ProfileCreate, db: Session = Depends(get_db)):
    new_profile = Profile(
        user_id=user_id,
        college=profile.college,
        branch=profile.branch,
        year=profile.year,
        cgpa=profile.cgpa,
        skills=profile.skills,
        interests=profile.interests,
        dream_job=profile.dream_job,
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return {
        "message": "Profile created successfully"
    }
@router.get("/{user_id}")
def get_profile(user_id: int, db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == user_id).first()

    if not profile:
        return {
            "message": "Profile not found"
        }

    return {
        "college": profile.college,
        "branch": profile.branch,
        "year": profile.year,
        "cgpa": profile.cgpa,
        "skills": profile.skills,
        "interests": profile.interests,
        "dream_job": profile.dream_job,
    }
@router.put("/update/{user_id}")
def update_profile(
    user_id: int,
    profile: ProfileCreate,
    db: Session = Depends(get_db)
):
    existing_profile = (
        db.query(Profile)
        .filter(Profile.user_id == user_id)
        .first()
    )

    if not existing_profile:
        return {"message": "Profile not found"}

    existing_profile.college = profile.college
    existing_profile.branch = profile.branch
    existing_profile.year = profile.year
    existing_profile.cgpa = profile.cgpa
    existing_profile.skills = profile.skills
    existing_profile.interests = profile.interests
    existing_profile.dream_job = profile.dream_job

    db.commit()
    db.refresh(existing_profile)

    return {
        "message": "Profile updated successfully"
    }