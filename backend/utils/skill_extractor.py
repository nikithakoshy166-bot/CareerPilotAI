import re

KNOWN_SKILLS = [
    # 💻 Software / IT
    "Python",
    "Java",
    "C",
    "C++",
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "FastAPI",
    "Django",
    "Flask",
    "SQL",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Git",
    "GitHub",
    "Docker",
    "HTML",
    "CSS",
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "PyTorch",
    "Pandas",
    "NumPy",
    "AWS",
    "Azure",
    "Linux",

    # 💰 Finance / Accounting
    "Accounting",
    "Financial Analysis",
    "Financial Modeling",
    "Financial Reporting",
    "Financial Planning",
    "Investment Analysis",
    "Investment Banking",
    "Corporate Finance",
    "Risk Management",
    "Portfolio Management",
    "Asset Management",
    "Budgeting",
    "Forecasting",
    "Auditing",
    "Taxation",
    "Tax Planning",
    "Bookkeeping",
    "Payroll",
    "Accounts Payable",
    "Accounts Receivable",
    "Excel",
    "Microsoft Excel",
    "Tally",
    "QuickBooks",
    "SAP",
    "Bloomberg",

    # 📊 Data / Analytics
    "Data Analysis",
    "Data Analytics",
    "Data Visualization",
    "Statistics",
    "Power BI",
    "Tableau",
    "Microsoft Power BI",
    "Business Intelligence",

    # 📢 Marketing
    "Digital Marketing",
    "Marketing",
    "SEO",
    "SEM",
    "Content Marketing",
    "Social Media Marketing",
    "Email Marketing",
    "Google Analytics",
    "Market Research",
    "Brand Management",

    # 👥 HR
    "Human Resources",
    "Recruitment",
    "Talent Acquisition",
    "Employee Relations",
    "Performance Management",
    "Payroll Management",
    "HR Management",
    "HRMS",

    # 🏗️ Engineering
    "AutoCAD",
    "SolidWorks",
    "MATLAB",
    "CAD",
    "Circuit Design",
    "Embedded Systems",
    "PLC",
    "Robotics",
    "3D Modeling",

    # 🏥 Healthcare
    "Healthcare",
    "Medical Coding",
    "Clinical Research",
    "Medical Billing",
    "Patient Care",
    "Healthcare Management",

    # 📚 Education
    "Teaching",
    "Lesson Planning",
    "Curriculum Development",
    "Classroom Management",
    "Training",
    "Public Speaking",

    # 🤝 General professional skills
    "Communication",
    "Leadership",
    "Teamwork",
    "Problem Solving",
    "Project Management",
    "Time Management",
    "Presentation",
    "Research",
    "Critical Thinking"
]


def extract_skills(text):
    found = []

    for skill in KNOWN_SKILLS:
        pattern = r"(?<!\w)" + re.escape(skill) + r"(?!\w)"

        if re.search(pattern, text, re.IGNORECASE):
            found.append(skill)

    return found