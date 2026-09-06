import { Card } from "react-bootstrap";

function CareerScoreCard({ score }) {

    return (
        <Card className="card-custom">
            <Card.Body>

                <div className="d-flex justify-content-between align-items-center">

                    <h5 className="mb-0">
                        <i className="bi bi-bar-chart-fill me-2"></i>
                        Career Score
                    </h5>

                    <i className="bi bi-graph-up-arrow fs-3 text-primary"></i>

                </div>

                <h1 className="mt-3 fw-bold">
                    {score}
                </h1>

                <p className="text-muted mb-0">
                    Based on your profile
                </p>

            </Card.Body>
        </Card>
    );
}

export default CareerScoreCard;