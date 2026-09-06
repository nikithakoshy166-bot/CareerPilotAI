import { Card, Badge } from "react-bootstrap";

function SkillCard({ profile }) {
    const skills = profile?.skills
        ? profile.skills.split(",").map(skill => skill.trim())
        : [];

    return (
        <Card className="card-custom">
            <Card.Body>

                <h5 className="mb-3">
                    <i className="bi bi-tools me-2"></i>
                    Skills
                </h5>

                {skills.length > 0 ? (
                    skills.map((skill, index) => (
                        <Badge
                            bg="primary"
                            className="me-2 mb-2"
                            key={index}
                        >
                            {skill}
                        </Badge>
                    ))
                ) : (
                    <p className="text-muted">
                        No skills added.
                    </p>
                )}

            </Card.Body>
        </Card>
    );
}

export default SkillCard;