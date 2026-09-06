import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://careerpilotai-4y1k.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Login User",
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.message === "Login successful") {
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("user_name", data.name);

        navigate("/dashboard");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  return (
    <div className="login-page">

      <div className="login-left">
        <div className="brand">
          <div className="brand-icon">🚀</div>
          <h1>CareerPilot AI</h1>
        </div>

        <div className="welcome-text">
          <h2>Navigate Your Career<br />with Intelligence.</h2>

          <p>
            Your AI-powered career companion for building skills,
            improving your resume, and reaching your dream job.
          </p>

          <div className="feature-list">
            <div>✓ AI Resume Analysis</div>
            <div>✓ Career Score & Skill Gap</div>
            <div>✓ Personalized Learning Roadmap</div>
          </div>
        </div>
      </div>

      <div className="login-right">

        <div className="login-card">

          <div className="login-heading">
            <h2>Welcome Back 👋</h2>
            <p>Sign in to continue your career journey</p>
          </div>

          <form onSubmit={handleLogin}>

            <div className="input-group-custom">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group-custom">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button">
              Login
            </button>

          </form>

          {message && (
            <p className="login-message">
              {message}
            </p>
          )}

          <div className="register-link">
            Don't have an account?
            <button onClick={() => navigate("/register")}>
              Register
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;