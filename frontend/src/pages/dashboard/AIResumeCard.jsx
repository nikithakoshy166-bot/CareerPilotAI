
import { useEffect, useState } from "react";
import { Card, Button, Spinner, Alert } from "react-bootstrap";

function AIResumeCard() {
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const userId = localStorage.getItem("user_id");

    const getAnalysis = () => {
        if (!userId) {
            setError("User not found.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");
        setFeedback("");

        fetch(
            `https://careerpilotai-4y1k.onrender.com/resume/ai-analysis/${userId}`
        )
            .then(async (res) => {
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(
                        data.detail ||
                        data.message ||
                        "Failed to get AI analysis"
                    );
                }

                return data;
            })
            .then((data) => {
                if (data.feedback) {
                    setFeedback(data.feedback);
                } else {
                    setError(
                        data.message || "No AI feedback available."
                    );
                }

                setLoading(false);
            })
            .catch((err) => {
                console.error(err);

                setError(
                    err.message ||
                    "Unable to load AI resume analysis."
                );

                setLoading(false);
            });
    };

    useEffect(() => {
        if (userId) {
            getAnalysis();
        }
    }, [userId]);

    return (
        <Card className="card-custom">
            <Card.Body>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">
                        <i className="bi bi-robot me-2"></i>
                        AI Resume Feedback
                    </h5>

                    <Button
                        variant="primary"
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
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <i className="bi bi-arrow-repeat me-1"></i>
                                Analyze
                            </>
                        )}
                    </Button>
                </div>

                {loading && (
                    <div className="text-center py-3">
                        <Spinner animation="border" />
                        <p className="text-muted mt-2 mb-0">
                            AI is analyzing your resume...
                        </p>
                    </div>
                )}

                {error && !loading && (
                    <Alert variant="warning" className="mb-0">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        {error}
                    </Alert>
                )}

                {feedback && !loading && (
                    <div>
                        <Alert variant="success">
                            <i className="bi bi-check-circle me-2"></i>
                            AI resume analysis completed.
                        </Alert>

                        <div
                            style={{
                                whiteSpace: "pre-wrap",
                                lineHeight: "1.7",
                            }}
                        >
                            {feedback}
                        </div>
                    </div>
                )}

            </Card.Body>
        </Card>
    );
}

export default AIResumeCard;