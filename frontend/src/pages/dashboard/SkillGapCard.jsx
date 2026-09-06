
import { useEffect, useState } from "react";
import { Card, Badge } from "react-bootstrap";

function SkillGapCard({ profile }) {

    const userId = localStorage.getItem("user_id");

    const [resumeSkills, setResumeSkills] = useState([]);
    const [resumeUploaded, setResumeUploaded] = useState(false);

    const skillMap = {
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

        "full stack developer": [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Node.js",
            "Express",
            "MongoDB",
            "Git"
        ],

        "python developer": [
            "Python",
            "FastAPI",
            "SQL",
            "Git",
            "Docker"
        ],

        "data scientist": [
            "Python",
            "Pandas",
            "NumPy",
            "Machine Learning",
            "SQL"
        ]
    };

    // Get skills from the uploaded resume
    useEffect(() => {
        if (!userId) return;

        fetch(`http://127.0.0.1:8000/resume/analyze/${userId}`)
            .then((res) => res.json())
            .then((data) => {

                if (data.skills && data.skills.length > 0) {
                    setResumeSkills(data.skills);
                    setResumeUploaded(true);
                }

            })
            .catch((err) => {
                console.log(err);
            });

    }, [userId]);

    // No profile yet
    if (!profile) {
        return (
            <Card className="card-custom">
                <Card.Body>
                    <h5 className="mb-3">
                        <i className="bi bi-lightbulb-fill me-2"></i>
                        Skill Gap Analysis
                    </h5>

                    <p className="text-muted">
                        Add your profile details to see your skill gap analysis.
                    </p>
                </Card.Body>
            </Card>
        );
    }

    const dreamJob = profile.dream_job?.trim().toLowerCase();

    // Dream job is not supported
    if (!dreamJob || !skillMap[dreamJob]) {
        return (
            <Card className="card-custom">
                <Card.Body>
                    <h5 className="mb-3">
                        <i className="bi bi-lightbulb-fill me-2"></i>
                        Skill Gap Analysis
                    </h5>

                    <p className="text-muted">
                        Add a supported dream job and upload your resume to see
                        your skill gap analysis.
                    </p>
                </Card.Body>
            </Card>
        );
    }

    const requiredSkills = skillMap[dreamJob];

    // Use skills detected from the resume
    const userSkills = resumeSkills
        .map(skill => skill.trim().toLowerCase())
        .filter(skill => skill !== "");

    // Resume not uploaded or no skills detected
    if (!resumeUploaded || userSkills.length === 0) {
        return (
            <Card className="card-custom">
                <Card.Body>
                    <h5 className="mb-3">
                        <i className="bi bi-lightbulb-fill me-2"></i>
                        Skill Gap Analysis
                    </h5>

                    <p className="text-muted">
                        Upload your resume to see what skills you are missing
                        for your dream job.
                    </p>
                </Card.Body>
            </Card>
        );
    }

    const missingSkills = requiredSkills.filter(
        skill => !userSkills.includes(skill.toLowerCase())
    );

    return (
        <Card className="card-custom">
            <Card.Body>

                <h5 className="mb-3">
                    <i className="bi bi-lightbulb-fill me-2"></i>
                    Skill Gap Analysis
                </h5>

                {missingSkills.length === 0 ? (
                    <p className="text-success">
                        Excellent! You already have all the required skills.
                    </p>
                ) : (
                    <>
                        <p className="text-muted">
                            You may want to develop these skills for{" "}
                            <strong>{dreamJob}</strong>:
                        </p>

                        {missingSkills.map((skill, index) => (
                            <Badge
                                bg="danger"
                                className="me-2 mb-2"
                                key={index}
                            >
                                {skill}
                            </Badge>
                        ))}
                    </>
                )}

            </Card.Body>
        </Card>
    );
}

export default SkillGapCard;