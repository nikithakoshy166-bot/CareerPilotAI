import { useState, useEffect } from "react";
import "./dashboard.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import CareerScoreCard from "./CareerScoreCard";
import ProgressCard from "./ProgressCard";
import ProfileCard from "./ProfileCard";
import SkillCard from "./SkillCard";
import RecommendationCard from "./RecommendationCard";
import SkillGapCard from "./SkillGapCard";
import ResumeUpload from "./ResumeUpload";
import ResumeAnalysisCard from "./ResumeAnalysisCard";
import RoadmapCard from "./RoadmapCard";
import AIResumeCard from "./AIResumeCard";
import GitHubAnalysis from "./GitHubAnalysis";

function Dashboard() {
  const userName = localStorage.getItem("user_name");
  const userId = localStorage.getItem("user_id");

  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [dreamJob, setDreamJob] = useState("");
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState(null);
  const [careerScore, setCareerScore] = useState(0);
  const [resumeUploaded, setResumeUploaded] = useState(false);

  useEffect(() => {
    fetch(`https://careerpilotai-4y1k.onrender.com/profile/${userId}`)
        .then((res) => res.json())
        .then((data) => {
            if (!data.message) {
                setProfile(data);
            }
        })
        .catch((err) => console.log(err));
}, [userId]);
  useEffect(() => {
    fetch(`https://careerpilotai-4y1k.onrender.com/analytics/career-score/${userId}`)
        .then((res) => res.json())
        .then((data) => {
            setCareerScore(data.career_score);
        })
        .catch((err) => console.log(err));
}, [userId]);

  const saveProfile = async () => {
    try {
      const response = await fetch(
        `https://careerpilotai-4y1k.onrender.com/profile/create/${userId}`,
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
            skills,
            interests,
            dream_job: dreamJob,
          }),
        }
      );

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Unable to save profile");
    }
  };

  return (
    <Container className="dashboard-container">

    <Row className="mb-4">
    <Col lg={6}>
        <CareerScoreCard score={careerScore} />
    </Col>

    <Col lg={6}>
        <ProgressCard profile={profile} />
    </Col>
</Row>

<Row className="mb-4">
    <Col lg={6}>
        <ProfileCard profile={profile} />
    </Col>
    <Col lg={12}>
        <AIResumeCard />
    </Col>
</Row>

<Row className="mb-4">
    <Col>
        <RecommendationCard score={careerScore} />
    </Col>
</Row>
<Row className="mb-4">
    <Col>
        <GitHubAnalysis />
    </Col>
</Row>

<Row className="mb-4">
    <Col>
        <SkillGapCard profile={profile} />
    </Col>
</Row>
<Row className="mb-4">
    <Col>
        <ResumeUpload onUploadSuccess={() => setResumeUploaded((prev) => !prev)} />
    </Col>
</Row>
<Row className="mb-4">
    <Col>
        <ResumeAnalysisCard refresh={resumeUploaded} />
    </Col>
</Row>
<Row className="mb-4">
    <Col>
        <RoadmapCard refresh={resumeUploaded} />
    </Col>
</Row>

    </Container>
  );
}

export default Dashboard;