import { useEffect, useState } from "react";
import { Card, Spinner, Alert, Button } from "react-bootstrap";

function AIResumeCard() {
  const userId = localStorage.getItem("user_id");

  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getAnalysis = () => {
    if (!userId) {
      setError("User not found.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    fetch(`https://careerpilotai-4y1k.onrender.com/profile/create/123/resume/ai-analysis/${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to get AI analysis");
        }
        return res.json();
      })
      .then((data) => {
        if (data.feedback) {
          setFeedback(data.feedback);
        } else {
          setError(data.message || "No AI feedback available.");
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load AI resume analysis.");
        setLoading(false);
      });
  };

  useEffect(() => {
    getAnalysis();
  }, [userId]);

  const formatFeedback = (text) => {
    if (!text) return null;

    const sections = text.split(/\n(?=###\s*\d+\.)/);

    return sections.map((section, index) => {
      const lines = section.trim().split("\n");

      const title = lines[0];

      const content = lines
        .slice(1)
        .join("\n")
        .replace(/\*\*/g, "");

      return (
        <div key={index} className="mb-4">
          <h6 className="fw-bold">{title}</h6>

          <div style={{ whiteSpace: "pre-line" }}>
            {content}
          </div>
        </div>
      );
    });
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <Card.Title className="fw-bold mb-0">
            🤖 AI Resume Feedback
          </Card.Title>

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
                Analyzing...
              </>
            ) : (
              "🔄 Re-analyze Resume"
            )}
          </Button>
        </div>

        {loading && !feedback && (
          <div className="text-center py-3">
            <Spinner animation="border" size="sm" />

            <span className="ms-2">
              AI is analyzing your resume...
            </span>
          </div>
        )}

        {error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}

        {!loading && !error && feedback && (
          <div>
            {formatFeedback(feedback)}
          </div>
        )}

      </Card.Body>
    </Card>
  );
}

export default AIResumeCard;