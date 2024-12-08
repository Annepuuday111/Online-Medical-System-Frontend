import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import IndexPage from './components/IndexPage'; 
import AdminDashboard from './components/AdminDashboard';
import MedicalStoreDashboard from './components/MedicalStoreDashboard';
import AddSpecialist from './components/AddSpecialist'; 
import AddDoctor from './components/AddDoctor'; 
import AddAppointment from './components/AddAppointment'; 
import AdminViewOrders from './components/AdminViewOrders'; 
import AdminViewAppointments from './components/AdminViewAppointments'; 
import AdminViewFeedback from './components/AdminViewFeedback'; 
import ViewDoctors from './components/ViewDoctors'; 
import ViewUsers from './components/ViewUsers'; 
import DoctorViewPatients from './components/DoctorViewPatients'; 
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import UserProfile from './components/UserProfile';
import DoctorProfile from './components/DoctorProfile';
import DoctorChangePassword from './components/DoctorChangePassword';
import DoctorViewAppointments from './components/DoctorViewAppointments';
import UserChangePassword from './components/UserChangePassword';
import UserViewAppointments from './components/UserViewAppointments';
import LoginPage from './components/LoginPage'; 
import SignupPage from './components/SignupPage';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import ViewOrders from './components/ViewOrders';

function App() {
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setUserRole(role);
  };

  const handleSignup = (role) => {
    setUserRole(role);
  };

  return (
    <Router>
      <Routes>
        {/* Index */}
        <Route path="/" element={<IndexPage onLogin={handleLogin} />} /> 
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* admin */}
        <Route path="/admin" element={userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/add-specialist" element={userRole === 'admin' ? <AddSpecialist /> : <Navigate to="/" />} />
        <Route path="/add-doctor" element={userRole === 'admin' ? <AddDoctor /> : <Navigate to="/" />} />
        <Route path="/view-doctor" element={userRole === 'admin' ? <ViewDoctors /> : <Navigate to="/" />} /> 
        <Route path="/view-users" element={userRole === 'admin' ? <ViewUsers /> : <Navigate to="/" />} />
        <Route path="/admin-view-orders" element={userRole === 'admin' ? <AdminViewOrders /> : <Navigate to="/" />} /> 
        <Route path="/admin-view-appointments" element={userRole === 'admin' ? <AdminViewAppointments /> : <Navigate to="/" />} />
        <Route path="/admin-view-feedback" element={userRole === 'admin' ? <AdminViewFeedback /> : <Navigate to="/" />} />

        {/* medical store */}
        <Route path="/medicalstore" element={userRole === 'medical' ? <MedicalStoreDashboard /> : <Navigate to="/" />} />
        <Route path="/view-orders" element={userRole === 'medical' ? <ViewOrders /> : <Navigate to="/" />} /> 

        {/* doctor */}
        <Route path="/doctor" element={userRole === 'doctor' ? <DoctorDashboard /> : <Navigate to="/" />} />
        <Route path="/doctor-profile" element={userRole === 'doctor' ? <DoctorProfile /> : <Navigate to="/" />} />
        <Route path="/doctor-change-password" element={userRole === 'doctor' ? <DoctorChangePassword /> : <Navigate to="/" />} />
        <Route path="/doctor-view-patients" element={userRole === 'doctor' ? <DoctorViewPatients /> : <Navigate to="/" />} />
        <Route path="/doctor-view-appointments" element={userRole === 'doctor' ? <DoctorViewAppointments /> : <Navigate to="/" />} />

        {/* User */}
        <Route path="/patient" element={userRole === 'patient' ? <PatientDashboard /> : <Navigate to="/" />} />
        <Route path="/add-appointment" element={userRole === 'patient' ? <AddAppointment /> : <Navigate to="/" />} />
        <Route path="/userprofile" element={userRole === 'patient' ? <UserProfile /> : <Navigate to="/" />} />
        <Route path="/user-change-password" element={userRole === 'patient' ? <UserChangePassword /> : <Navigate to="/" />} />
        <Route path="/user-view-appointments" element={userRole === 'patient' ? <UserViewAppointments /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
