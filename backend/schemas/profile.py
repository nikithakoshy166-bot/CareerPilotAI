from pydantic import BaseModel


class ProfileCreate(BaseModel):
    college: str
    branch: str
    year: int
    cgpa: float
    skills: str
    interests: str
    dream_job: str