import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Sayfa Bulunamadı</h2>
        <p>Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
        <div className="not-found-actions">
          <Link to="/" className="home-button">
            Ana Sayfaya Dön
          </Link>
          <div className="available-routes">
            <p>Mevcut sayfalar:</p>
            <ul>
              <li><Link to="/">Ana Sayfa</Link></li>
              <li><Link to="/react">React Uygulaması</Link></li>
              <li><Link to="/vue">Vue Uygulaması</Link></li>
              <li><Link to="/angular">Angular Uygulaması</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
