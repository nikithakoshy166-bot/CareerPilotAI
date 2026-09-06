import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  return (
    <div className="register-page">

      <div className="register-left">
        <div className="register-brand">
          <div className="register-icon">🚀</div>
          <h1>CareerPilot AI</h1>
        </div>

        <div className="register-intro">
          <h2>Start Your Career<br />Journey Today.</h2>

          <p>
            Build your profile, analyze your resume,
            discover skill gaps, and create a personalized
            path toward your dream career.
          </p>

          <div className="register-features">
            <div>✓ Personalized Career Guidance</div>
            <div>✓ AI-Powered Resume Analysis</div>
            <div>✓ Smart Learning Roadmap</div>
          </div>
        </div>
      </div>

      <div className="register-right">

        <div className="register-card">

          <div className="register-heading">
            <h2>Create Account ✨</h2>
            <p>Start building your career with CareerPilot AI</p>
          </div>

          <form onSubmit={handleRegister}>

            <div className="register-input">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="register-input">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="register-input">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="register-button">
              Create Account
            </button>

          </form>

          {message && (
            <p className="register-message">
              {message}
            </p>
          )}

          <div className="login-link">
            Already have an account?
            <button onClick={() => navigate("/")}>
              Login
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;