
import { Card, ProgressBar } from "react-bootstrap";

function ProgressCard({ profile }) {
    const fields = [
        profile?.college,
        profile?.branch,
        profile?.year,
        profile?.cgpa,
        profile?.dream_job,
    ];

    const filled = fields.filter(field => field).length;
    const completion = Math.round((filled / fields.length) * 100);

    return (
        <Card className="card-custom">
            <Card.Body>

                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">
                        <i className="bi bi-person-check-fill me-2"></i>
                        Profile Completion
                    </h5>

                    <span className="fw-bold">{completion}%</span>
                </div>

                <ProgressBar now={completion} className="mt-3" />

                <p className="text-muted mt-3 mb-0">
                    Complete your profile to improve recommendations.
                </p>

            </Card.Body>
        </Card>
    );
}

export default ProgressCard;
