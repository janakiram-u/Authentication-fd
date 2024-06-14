// Login.js
import React, { useState } from 'react';
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography, IconButton, InputAdornment, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import login1 from '../../images/login1.jpg';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from './AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setEmailError('');
    setPasswordError('');

    // Validate form
    let valid = true;
    if (!validateEmail(form.email)) {
      setEmailError('Please enter a valid email');
      valid = false;
    }
    if (!form.password) {
      setPasswordError('Password is required');
      valid = false;
    }

    if (!valid) return;

    try {
      // Fetch user by email
      const response = await fetch(`http://localhost:3001/users?email=${form.email}`);
      const data = await response.json();

      // Check if user exists and password matches
      if (data.length > 0 && data[0].password === form.password) {
        login();
        navigate('/congrats');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error logging in');
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', padding: 0, minWidth: '100%', flexDirection: { xs: 'column', md: 'row' } }}>
      <Box
        sx={{
          flex: 2,
          display: { xs: 'none', md: 'block' },
          backgroundImage: `url(${login1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          position: 'relative'
        }}
      >
        <Box sx={{ position: 'absolute', bottom: 50, left: 80, bgcolor: 'white', p: 0.2 }}>
          <img src={login1} alt="Login" style={{ width: 130, height: 200, borderRadius: 5, objectFit: 'cover' }} />
        </Box>
      </Box>
      <Box
        sx={{
          flex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: { xs: 2, sm: 8 },
          backgroundColor: '#f9f9f9'
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#ff6600' }}>Login</Typography>
        <Typography variant="body1" sx={{ marginBottom: 3, color: '#888', textAlign: 'center' }}>
          Welcome back! Please login to your account.
        </Typography>
        {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            onChange={handleChange}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            onChange={handleChange}
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 2 }}>
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <Link to='/forgot-password' style={{ color: 'orange' }}>forgot password ?</Link>
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ backgroundColor: '#ff6600', marginBottom: 2 }}>Login</Button>
        </form>
        <Link to="/sign-up" style={{ textDecoration: 'none', color: '#ff6600', marginBottom: 2 }}>
          Don't have an account? Sign Up
        </Link>
        <Typography variant="body1" sx={{ marginBottom: 2, color: '#888', textAlign: 'center' }}>Or login with</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <IconButton><FacebookIcon /></IconButton>
          <IconButton><GoogleIcon /></IconButton>
          <IconButton><AppleIcon /></IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
