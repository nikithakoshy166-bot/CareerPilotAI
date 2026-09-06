
ROADMAPS = {
    "python developer": [
        "Python",
        "OOP",
        "SQL",
        "FastAPI",
        "REST API",
        "PostgreSQL",
        "Docker",
        "Git",
        "GitHub"
    ],

    "java developer": [
        "Java",
        "OOP",
        "DSA",
        "SQL",
        "Spring",
        "Hibernate",
        "MySQL",
        "REST API",
        "Git",
        "GitHub"
    ],

    "frontend developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Git",
        "GitHub",
        "Responsive Design"
    ],

    "full stack developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "SQL",
        "Git",
        "Docker"
    ],
    "software developer": [
    "Programming",
    "OOP",
    "DSA",
    "SQL",
    "Git",
    "GitHub",
    "REST API",
    "Problem Solving"
    ],

    "data analyst": [
        "Python",
        "SQL",
        "Excel",
        "Statistics",
        "Pandas",
        "NumPy",
        "Power BI",
        "Tableau",
        "Data Visualization"
    ],

    "data scientist": [
        "Python",
        "NumPy",
        "Pandas",
        "Matplotlib",
        "Statistics",
        "Machine Learning",
        "Scikit-learn",
        "SQL"
    ],

    "financial analyst": [
        "Accounting",
        "Financial Analysis",
        "Financial Modeling",
        "Excel",
        "Budgeting",
        "Forecasting",
        "Risk Management",
        "Financial Reporting"
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
        "Content Marketing",
        "Market Research",
        "Brand Management"
    ]
}


SKILL_DESCRIPTIONS = {
    "Python": "Learn Python programming and build practical projects.",
    "OOP": "Learn object-oriented programming concepts such as classes, objects, inheritance, and polymorphism.",
    "SQL": "Practice databases, queries, joins, filtering, and data management.",
    "FastAPI": "Learn to build REST APIs using FastAPI and Python.",
    "REST API": "Learn how APIs work and how applications communicate with each other.",
    "PostgreSQL": "Learn PostgreSQL database design, queries, and data management.",
    "Docker": "Learn how to containerize and run applications using Docker.",
    "Git": "Learn version control and manage your projects using Git.",
    "GitHub": "Learn how to store, manage, and showcase your projects on GitHub.",

    "Java": "Learn Java programming and strengthen object-oriented programming skills.",
    "DSA": "Practice data structures and algorithms for technical interviews.",
    "Spring": "Learn to build backend applications using Spring.",
    "Hibernate": "Learn database interaction and ORM using Hibernate.",
    "MySQL": "Learn MySQL databases, queries, and database management.",

    "HTML": "Learn how to structure web pages using HTML.",
    "CSS": "Learn styling, layouts, and responsive web design using CSS.",
    "JavaScript": "Learn JavaScript fundamentals and interactive web development.",
    "TypeScript": "Learn typed JavaScript for building scalable applications.",
    "React": "Learn component-based frontend development using React.",
    "Responsive Design": "Learn how to make websites work well on phones, tablets, and desktops.",

    "Node.js": "Learn backend development using Node.js.",
    "Express": "Learn how to build backend APIs using Express.",
    "MongoDB": "Learn NoSQL database concepts and MongoDB.",

    "Programming": "Strengthen programming fundamentals, logic building, and coding skills.",
    "Problem Solving": "Practice logical thinking and solve programming problems efficiently.",

    "Excel": "Learn spreadsheets, formulas, data analysis, and reporting using Excel.",
    "Statistics": "Learn statistical concepts useful for data analysis and decision-making.",
    "Pandas": "Learn data manipulation and analysis using Pandas.",
    "NumPy": "Learn numerical computing and array operations using NumPy.",
    "Power BI": "Learn to create dashboards and analyze data using Power BI.",
    "Tableau": "Learn data visualization and dashboard creation using Tableau.",
    "Data Visualization": "Learn how to present data clearly using charts and visualizations.",
    "Matplotlib": "Learn how to create data visualizations using Matplotlib.",
    "Machine Learning": "Learn machine learning concepts and build predictive models.",
    "Scikit-learn": "Learn how to implement machine learning models using Scikit-learn.",

    "Accounting": "Strengthen accounting principles and financial record management.",
    "Financial Analysis": "Learn to analyze financial statements and business performance.",
    "Financial Modeling": "Learn to create financial models for forecasting and decision-making.",
    "Budgeting": "Learn how to prepare and manage organizational budgets.",
    "Forecasting": "Learn financial forecasting and prediction techniques.",
    "Risk Management": "Learn how to identify, evaluate, and manage financial risks.",
    "Financial Reporting": "Learn how to prepare and interpret financial reports.",

    "Taxation": "Learn taxation principles and tax compliance.",
    "Auditing": "Learn auditing procedures and financial verification.",
    "Bookkeeping": "Learn how to maintain accurate financial records.",
    "Payroll": "Learn payroll processing and employee payment management.",
    "Tally": "Learn accounting and financial management using Tally.",
    "QuickBooks": "Learn accounting and bookkeeping using QuickBooks.",

    "Marketing": "Learn marketing fundamentals and customer-focused strategies.",
    "Digital Marketing": "Learn online marketing strategies and digital campaigns.",
    "SEO": "Learn search engine optimization to improve website visibility.",
    "SEM": "Learn paid search advertising and search engine marketing.",
    "Google Analytics": "Learn how to analyze website traffic and user behavior.",
    "Content Marketing": "Learn how to create useful content to attract and engage audiences.",
    "Market Research": "Learn how to research customers, competitors, and market trends.",
    "Brand Management": "Learn how to build and manage a strong brand."
}


def generate_roadmap(dream_job, user_skills):

    # Handle missing dream job
    if not dream_job or not dream_job.strip():
        return {
            "dream_job": "",
            "next_skills": [],
            "has_profile": False,
            "message": "Add your dream job and skills to generate your personalized learning path."
        }

    dream_job = dream_job.lower().strip()

    # Check whether the dream job is supported
    roadmap = ROADMAPS.get(dream_job)

    if roadmap is None:
        return {
            "dream_job": dream_job,
            "next_skills": [],
            "has_profile": True,
            "message": "This dream job is not currently supported. Please choose a supported career."
        }

    # Handle missing skills
    if not user_skills:
        return {
            "dream_job": dream_job,
            "next_skills": [],
            "has_profile": True,
            "has_skills": False,
            "message": "Add your skills or upload your resume to generate your personalized learning path."
        }

    user_skill_names = [
        skill.strip().lower()
        for skill in user_skills
        if skill and skill.strip()
    ]

    # Find missing skills
    missing = [
        skill
        for skill in roadmap
        if skill.lower() not in user_skill_names
    ]

    result = []

    for skill in missing:
        result.append({
            "skill": skill,
            "description": SKILL_DESCRIPTIONS.get(
                skill,
                f"Learn and practice {skill}."
            )
        })

    # User has all required skills
    if not result:
        return {
            "dream_job": dream_job,
            "next_skills": [],
            "has_profile": True,
            "has_skills": True,
            "all_skills_completed": True,
            "message": "You already know all the required skills!"
        }

    return {
        "dream_job": dream_job,
        "next_skills": result,
        "has_profile": True,
        "has_skills": True,
        "all_skills_completed": False,
        "message": "Here are the skills you should learn next."
    }
