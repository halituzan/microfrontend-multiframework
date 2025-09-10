import { useSearchParams, useNavigate, Link } from "react-router-dom";
import "./DetailPage.css";

const DetailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const userName = searchParams.get("name");
  const userRole = searchParams.get("role");

  const handleGoBack = () => {
    navigate("/react");
  };

  return (
    <div className="detail-page">
      <div className="detail-container">
        <h1 className="detail-title">User Details</h1>
        
        <div className="detail-card">
          <div className="detail-icon">👤</div>
          
          <div className="detail-info">
            <div className="detail-field">
              <label className="detail-label">Name:</label>
              <span className="detail-value">{userName || "Unknown"}</span>
            </div>
            
            <div className="detail-field">
              <label className="detail-label">Role:</label>
              <span className="detail-value">{userRole || "Unknown"}</span>
            </div>
          </div>
        </div>

        <Link to="/not-found">
        
          Not Found
       
        </Link>
        <button className="back-button" onClick={handleGoBack}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default DetailPage; 