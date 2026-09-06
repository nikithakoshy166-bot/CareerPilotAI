JOB_SKILLS = {
    "python developer": [
        "Python", "SQL", "Git", "GitHub", "FastAPI",
        "Django", "Flask", "Docker", "PostgreSQL"
    ],

    "java developer": [
        "Java", "SQL", "Git", "GitHub", "Spring",
        "Hibernate", "MySQL"
    ],

    "frontend developer": [
        "HTML", "CSS", "JavaScript", "React",
        "TypeScript", "Git", "GitHub"
    ],

    "data analyst": [
        "Python", "SQL", "Excel", "Power BI",
        "Tableau", "Statistics", "Pandas", "NumPy"
    ],

    "financial analyst": [
        "Accounting",
        "Financial Analysis",
        "Financial Modeling",
        "Excel",
        "Microsoft Excel",
        "Budgeting",
        "Forecasting",
        "Risk Management"
    ],

    "accountant": [
        "Accounting",
        "Taxation",
        "Auditing",
        "Bookkeeping",
        "Payroll",
        "Tally",
        "QuickBooks",
        "Excel"
    ],

    "marketing manager": [
        "Marketing",
        "Digital Marketing",
        "SEO",
        "SEM",
        "Google Analytics",
        "Content Marketing"
    ]
}


def calculate_score(skills, dream_job):

    matched_skills = []
    missing_skills = []

    if not dream_job:
        score = min(len(skills) * 10, 100)

        return {
            "score": score,
            "level": get_level(score),
            "matched_skills": skills,
            "missing_skills": []
        }

    job = dream_job.lower().strip()

    required = JOB_SKILLS.get(job)

    if required:

        for skill in required:
            if skill.lower() in [s.lower() for s in skills]:
                matched_skills.append(skill)
            else:
                missing_skills.append(skill)

        score = int((len(matched_skills) / len(required)) * 100)

    else:
        score = min(len(skills) * 10, 100)
        matched_skills = skills

    return {
        "score": score,
        "level": get_level(score),
        "matched_skills": matched_skills,
        "missing_skills": missing_skills
    }


def get_level(score):

    if score >= 80:
        return "Excellent"

    elif score >= 60:
        return "Good"

    elif score >= 40:
        return "Average"

    else:
        return "Needs Improvement"
def generate_suggestions(missing_skills):
    suggestions = []

    for skill in missing_skills:
        suggestions.append(
            f"Consider learning {skill} and adding a related project or experience to your resume."
        )

    if not suggestions:
        suggestions.append(
            "Great job! Your resume covers all the important skills for this role."
        )

    return suggestions