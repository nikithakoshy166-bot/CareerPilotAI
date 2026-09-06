
import { useState } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";

function ProfileCard({ profile }) {
    const [editing, setEditing] = useState(false);

    const [college, setCollege] = useState(profile?.college || "");
    const [branch, setBranch] = useState(profile?.branch || "");
    const [year, setYear] = useState(profile?.year || "");
    const [cgpa, setCgpa] = useState(profile?.cgpa || "");
    const [dreamJob, setDreamJob] = useState(profile?.dream_job || "");

    const userId = localStorage.getItem("user_id");

    const handleSave = async () => {
        try {
            const response = await fetch(
                `https://careerpilotai-4y1k.onrender.com/profile/create/123/profile/create/${userId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        college,
                        branch,
                        year: Number(year),
                        cgpa: Number(cgpa),
                        skills: profile?.skills || "",
                        interests: profile?.interests || "",
                        dream_job: dreamJob,
                    }),
                }
            );

            if (response.ok) {
                setEditing(false);
                window.location.reload();
            } else {
                alert("Failed to update profile");
            }
        } catch (error) {
            console.error(error);
            alert("Unable to update profile");
        }
    };

    return (
        <Card className="card-custom">
            <Card.Body>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">
                        <i className="bi bi-person-circle me-2"></i>
                        My Profile
                    </h5>

                    {!editing && (
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => setEditing(true)}
                        >
                            <i className="bi bi-pencil me-1"></i>
                            Edit
                        </Button>
                    )}
                </div>

                {!editing ? (
                    <>
                        <p><strong>College:</strong> {profile?.college || "Not Added"}</p>
                        <p><strong>Branch:</strong> {profile?.branch || "Not Added"}</p>
                        <p><strong>Year:</strong> {profile?.year || "Not Added"}</p>
                        <p><strong>CGPA:</strong> {profile?.cgpa || "Not Added"}</p>
                        <p><strong>Dream Job:</strong> {profile?.dream_job || "Not Added"}</p>
                    </>
                ) : (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>College</Form.Label>
                            <Form.Control
                                value={college}
                                onChange={(e) => setCollege(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Branch</Form.Label>
                            <Form.Control
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                            />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Year</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>CGPA</Form.Label>
                                    <Form.Control
                                        type="number"
                                        step="0.01"
                                        value={cgpa}
                                        onChange={(e) => setCgpa(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Dream Job</Form.Label>
                            <Form.Control
                                value={dreamJob}
                                onChange={(e) => setDreamJob(e.target.value)}
                            />
                        </Form.Group>

                        <div className="d-flex gap-2">
                            <Button variant="primary" onClick={handleSave}>
                                Save Changes
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </>
                )}

            </Card.Body>
        </Card>
    );
}

export default ProfileCard;
