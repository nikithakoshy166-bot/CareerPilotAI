
import { Card } from "react-bootstrap";

function RecommendationCard({ score }) {

    let recommendation = "";

    if (score >= 85) {
        recommendation =
            "Excellent! You are close to placement-ready. Keep practicing DSA, building projects, and applying for opportunities.";
    } else if (score >= 70) {
        recommendation =
            "Good progress! Strengthen your problem-solving skills, improve your projects, and keep practicing for technical interviews.";
    } else if (score >= 50) {
        recommendation =
            "You are making progress. Focus on improving your technical skills, building projects, and strengthening your resume.";
    } else {
        recommendation =
            "Start by completing your profile, learning the fundamentals, and building a few practical projects.";
    }

    return (
        <Card className="card-custom">
            <Card.Body>

                <h5 className="mb-3">
                    <i className="bi bi-stars me-2"></i>
                    AI Recommendation
                </h5>

                <p className="mb-0">
                    {recommendation}
                </p>

            </Card.Body>
        </Card>
    );
}

export default RecommendationCard;