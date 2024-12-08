import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import './IndexPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const IndexPage = () => {
  return (
    <>
      <Navbar />
      <div className="directory-section">
        <div className="container">
          <div className="search-container">
            <h2>Welcome to Health Care</h2>
            <p>A better Doctors, Specialist. We'll help you find it.</p>
            <div className="search-card">
              <div className="search-box">
                <input type="text" placeholder="Keywords..." />
                <select>
                  <option>All Regions</option>
                </select>
                <select>
                  <option>All Categories</option>
                </select>
                <button>Search Now</button>
              </div>
            </div>
          </div>

          <div className="icon-links">
            <div className="icon-link">
              <i className="fas fa-user-md" style={{ color: '#ffffff', fontSize: '50px' }}></i>
              <p>Doctors</p>
            </div>
            <div className="icon-link">
              <i className="fas fa-clinic-medical" style={{ color: '#ffffff', fontSize: '50px' }}></i>
              <p>Clinics</p>
            </div>
            <div className="icon-link">
              <i className="fas fa-flask" style={{ color: '#ffffff', fontSize: '50px' }}></i>
              <p>Labs</p>
            </div>
            <div className="icon-link">
              <i className="fas fa-prescription-bottle-alt" style={{ color: '#ffffff', fontSize: '50px' }}></i>
              <p>Pharmacies</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default IndexPage;
