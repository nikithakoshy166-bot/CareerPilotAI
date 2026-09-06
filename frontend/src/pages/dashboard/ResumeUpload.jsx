import { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

function ResumeUpload({ onUploadSuccess }) {
    const userId = localStorage.getItem("user_id");

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [existingResume, setExistingResume] = useState(null);

    // Check if the user already has a resume
    useEffect(() => {
        fetch(`https://careerpilotai-4y1k.onrender.com/resume/latest/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.uploaded) {
                    setExistingResume(data.filename);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userId]);

    const uploadResume = async () => {
        if (!file) {
            setMessage("Please select a PDF.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(
                `https://careerpilotai-4y1k.onrender.com/resume/upload/${userId}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);

                // Show the newly uploaded filename
                setExistingResume(data.filename);

                // Tell Dashboard that a new resume was uploaded
                if (onUploadSuccess) {
                    onUploadSuccess();
                }
            } else {
                setMessage(data.message || "Upload failed.");
            }
        } catch (err) {
            console.log(err);
            setMessage("Upload failed.");
        }
    };

    return (
        <Card className="card-custom">
            <Card.Body>

                <h5 className="mb-3">
                    📄 Resume
                </h5>

                {existingResume ? (
                    <div className="mb-3">
                        <p className="text-success mb-2">
                            ✅ Resume already uploaded
                        </p>

                        <p>
                            <strong>File:</strong> {existingResume}
                        </p>
                    </div>
                ) : (
                    <p className="mb-3">
                        No resume uploaded yet.
                    </p>
                )}

                <Form.Group className="mb-3">
                    <Form.Control
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </Form.Group>

                <Button onClick={uploadResume}>
                    {existingResume ? "Replace Resume" : "Upload Resume"}
                </Button>

                {message && (
                    <p className="mt-3 text-success">
                        {message}
                    </p>
                )}

            </Card.Body>
        </Card>
    );
}

export default ResumeUpload;