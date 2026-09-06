from utils.resume_analyzer import extract_text
from utils.skill_extractor import extract_skills

text = extract_text("uploads/Action Plan for My 4.pdf")

skills = extract_skills(text)

print(skills)