from sqlalchemy import Column, Integer, String, Float, ForeignKey
from database.database import Base


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    college = Column(String(150))
    branch = Column(String(100))
    year = Column(Integer)
    cgpa = Column(Float)

    skills = Column(String(500))
    interests = Column(String(500))

    dream_job = Column(String(150))