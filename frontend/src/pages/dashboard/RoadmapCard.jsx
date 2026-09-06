
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

function RoadmapCard({ refresh }) {
    const userId = localStorage.getItem("user_id");

    const [roadmap, setRoadmap] = useState(null);

    useEffect(() => {
        if (!userId) {
            setRoadmap({
                noProfile: true
            });
            return;
        }

        fetch(`https://careerpilotai-4y1k.onrender.com/profile/create/123/resume/roadmap/${userId}`)
            .then((res) => res.json())
            .then((data) => setRoadmap(data))
            .catch((err) => {
                console.log(err);
                setRoadmap({
                    error: true
                });
            });
    }, [userId, refresh]);

    if (!roadmap) {
        return (
            <Card className="card-custom">
                <Card.Body>
                    Loading roadmap...
                </Card.Body>
            </Card>
        );
    }

    if (roadmap.error) {
        return (
            <Card className="card-custom">
                <Card.Body>

                    <h5 className="mb-3">
                        🗺 Learning Roadmap
                    </h5>

                    <p className="text-muted">
                        Unable to load your learning roadmap right now.
                    </p>

                </Card.Body>
            </Card>
        );
    }

    /*
     * No profile / no dream job yet
     */
    if (
        roadmap.noProfile ||
        !roadmap.dream_job ||
        roadmap.dream_job.trim() === ""
    ) {
        return (
            <Card className="card-custom">
                <Card.Body>

                    <h5 className="mb-3">
                        🗺 Learning Roadmap
                    </h5>

                    <p className="text-muted">
                        Add your dream job and skills to generate your
                        personalized learning path.
                    </p>

                </Card.Body>
            </Card>
        );
    }

    /*
    * Profile exists, but resume has not been uploaded yet
    */
    if (roadmap.resume_uploaded === false) {
        return (
            <Card className="card-custom">
                <Card.Body>

                    <h5 className="mb-3">
                        🗺 Learning Roadmap
                    </h5>

                    <p>
                        <strong>Dream Job:</strong> {roadmap.dream_job}
                    </p>

                    <p className="text-muted">
                        Please upload your resume to generate your
                        personalized learning path.
                    </p>

                </Card.Body>
            </Card>
        );
    }



    return (
        <Card className="card-custom">
            <Card.Body>

                <h5 className="mb-3">
                    🗺 Learning Roadmap
                </h5>

                <p>
                    <strong>Dream Job:</strong> {roadmap.dream_job}
                </p>

                <h6 className="mt-3 mb-3">
                    🚀 Your Learning Path
                </h6>

                {roadmap.next_skills &&
                roadmap.next_skills.length > 0 ? (
                    <div>

                        {roadmap.next_skills.map((item, index) => (
                            <div
                                key={index}
                                className="d-flex align-items-start mb-4"
                            >

                                <div
                                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                                    style={{
                                        width: "35px",
                                        height: "35px",
                                        minWidth: "35px"
                                    }}
                                >
                                    {index + 1}
                                </div>

                                <div>
                                    <strong>
                                        {item.skill}
                                    </strong>

                                    <div className="text-muted small mt-1">
                                        {item.description}
                                    </div>
                                </div>

                            </div>
                        ))}

                    </div>
                ) : (
                    <p className="text-success">
                        🎉 You already know all the required skills!
                    </p>
                )}

            </Card.Body>
        </Card>
    );
}

export default RoadmapCard;
