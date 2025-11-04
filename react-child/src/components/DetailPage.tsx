import { useNavigate } from "react-router-dom";
import "./DetailPage.css";
import { useEffect, useState } from "react";

const DetailPage = () => {
  const [globalStore, setGlobalStore] = useState<any>(null);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/react");
  };

  useEffect(() => {
    import("host/GlobalStore").then((mod) => {
      const store = mod.default || mod;
      setGlobalStore(store);
    });
  }, [])

  return (
    <div className="detail-page">
      <div className="detail-container">
        <h1 className="detail-title">User Details</h1>

        <div className="detail-card">
          <div className="detail-icon">👤</div>

          <div className="detail-info">
            <div className="detail-field">
              <label className="detail-label">Name:</label>
              <span className="detail-value">{globalStore?.getState().user?.name || "Unknown"}</span>
            </div>

            <div className="detail-field">
              <label className="detail-label">Role:</label>
              <span className="detail-value">{globalStore?.getState().user?.role || "Unknown"}</span>
            </div>
          </div>
        </div>

        <button className="back-button" onClick={handleGoBack}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default DetailPage; 