
import { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";

function GitHubAnalysis() {
    const [username, setUsername] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const analyzeGitHub = async () => {
        if (!username.trim()) {
            setError("Please enter a GitHub username");
            return;
        }

        setLoading(true);
        setError("");
        setData(null);

        try {
            const response = await fetch(
                `https://careerpilotai-4y1k.onrender.com/profile/create/123/github/analyze/${username.trim()}`
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.detail || "Unable to analyze GitHub profile");
            }

            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="card-custom">
            <Card.Body>

                <h5 className="mb-3">
                    <i className="bi bi-github me-2"></i>
                    GitHub Analysis
                </h5>

                <Form.Group className="mb-3">
                    <Form.Label>GitHub Username</Form.Label>

                    <Form.Control
                        type="text"
                        placeholder="Enter your GitHub username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                analyzeGitHub();
                            }
                        }}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    onClick={analyzeGitHub}
                    disabled={loading}
                >
                    {loading ? "Analyzing..." : "Analyze GitHub"}
                </Button>

                {error && (
                    <p className="text-danger mt-3">
                        {error}
                    </p>
                )}

                {data && (
                    <div className="mt-4">

                        <h6>
                            GitHub Score:{" "}
                            <strong>{data.github_score}/100</strong>
                        </h6>

                        <Row className="mt-3">

                            <Col md={6}>
                                <p>
                                    <strong>Repositories:</strong>{" "}
                                    {data.profile.public_repositories}
                                </p>

                                <p>
                                    <strong>Followers:</strong>{" "}
                                    {data.profile.followers}
                                </p>

                                <p>
                                    <strong>Following:</strong>{" "}
                                    {data.profile.following}
                                </p>
                            </Col>

                            <Col md={6}>
                                <p>
                                    <strong>Stars:</strong>{" "}
                                    {data.statistics.total_stars}
                                </p>

                                <p>
                                    <strong>Forks:</strong>{" "}
                                    {data.statistics.total_forks}
                                </p>

                                <p>
                                    <strong>Primary Language:</strong>{" "}
                                    {data.statistics.primary_language}
                                </p>
                            </Col>

                        </Row>

                        <hr />

                        <h6>Recommendations</h6>

                        <ul>
                            {data.recommendations.map((recommendation, index) => (
                                <li key={index}>
                                    {recommendation}
                                </li>
                            ))}
                        </ul>

                    </div>
                )}

            </Card.Body>
        </Card>
    );
}

export default GitHubAnalysis;
