import { useEffect, useState } from "react";
import { Card, Badge, Button, Spinner } from "react-bootstrap";

function ResumeAnalysisCard({ refresh }) {
    const userId = localStorage.getItem("user_id");

    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);

    const getAnalysis = () => {
        if (!userId) return;

        setLoading(true);

        fetch(`http://127.0.0.1:8000/resume/analyze/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setAnalysis(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
    getAnalysis();
}, [userId, refresh]);
    if (loading && !analysis) {
        return (
            <Card className="card-custom">
                <Card.Body>
                    Loading resume analysis...
                </Card.Body>
            </Card>
        );
    }

    if (!analysis || analysis.message) {
        return (
            <Card className="card-custom">
                <Card.Body>
                    <h5 className="mb-3">📄 Resume Analysis</h5>
                    <p>No resume uploaded yet.</p>

                    <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={getAnalysis}
                    >
                        🔄 Check Again
                    </Button>
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card className="card-custom">
            <Card.Body>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">
                        📄 Resume Analysis
                    </h5>

                    <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={getAnalysis}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner
                                    animation="border"
                                    size="sm"
                                    className="me-2"
                                />
                                Updating...
                            </>
                        ) : (
                            "🔄 Refresh"
                        )}
                    </Button>
                </div>

                <h3>
                    ATS Score: {analysis.ats_score}%
                </h3>

                <p>
                    <strong>Level:</strong> {analysis.level}
                </p>

                <h6 className="mt-3">
                    Detected Skills
                </h6>

                {analysis.skills && analysis.skills.length > 0 ? (
                    analysis.skills.map((skill, index) => (
                        <Badge
                            bg="success"
                            className="me-2 mb-2"
                            key={index}
                        >
                            {skill}
                        </Badge>
                    ))
                ) : (
                    <p>No skills detected.</p>
                )}
                <h6 className="mt-3">
                    ✅ Matched Skills
                </h6>

                {analysis.matched_skills && analysis.matched_skills.length > 0 ? (
                    analysis.matched_skills.map((skill, index) => (
                        <Badge
                            bg="success"
                            className="me-2 mb-2"
                            key={index}
                        >
                            {skill}
                        </Badge>
                        
                    ))
                ) : (
                    <p>No matching skills found.</p>
                )}
                <h6 className="mt-4">
                    💡 How to Improve
                </h6>

                {analysis.suggestions && analysis.suggestions.length > 0 ? (
                    <ul>
                        {analysis.suggestions.map((suggestion, index) => (
                            <li key={index} className="mb-2">
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No improvement suggestions available.</p>
                )}

                <h6 className="mt-3">
                    ❌ Missing Skills
                </h6>

                {analysis.missing_skills && analysis.missing_skills.length > 0 ? (
                    analysis.missing_skills.map((skill, index) => (
                        <Badge
                            bg="danger"
                            className="me-2 mb-2"
                            key={index}
                        >
                            {skill}
                        </Badge>
                    ))
                ) : (
                    <p>No missing skills 🎉</p>
                )}

            </Card.Body>
        </Card>
    );
}

export default ResumeAnalysisCard;