// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Authentication/AuthContext';
import withAuth from './components/Authentication/withAuth';
import Login from './components/Authentication/Login';
import SignUp from './components/Authentication/SignUp';
import SetPassword from './components/Authentication/SetPassword';
import VerifyCode from './components/Authentication/VerifyCode';
import SplashScreen from './components/Splash/SplashScreen';
import ForgotPassword from './components/Authentication/ForgotPassword';
import Home from './components/Home';
import Congratulations from './components/Authentication/Congratulations';
import Banner from './components/Banner/Banner';

const ProtectedHome = withAuth(Home);
const ProtectedCongratulations = withAuth(Congratulations);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/set-password" element={<SetPassword />} />
            <Route path="/congrats" element={<ProtectedCongratulations />} />
            <Route path="/banner" element={<Banner/>}/>

            {/* Protected routes */}
            <Route path="/home" element={<ProtectedHome />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
