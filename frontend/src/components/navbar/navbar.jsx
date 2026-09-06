import { useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("user_name");

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    navigate("/");
  };

  return (
    <nav className="top-navbar">

      <div className="navbar-brand">
        <span className="navbar-logo">🚀</span>
        <span>CareerPilot AI</span>
      </div>

      <div className="navbar-right">

        <span className="welcome-user">
          Welcome, {userName || "User"} 👋
        </span>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;