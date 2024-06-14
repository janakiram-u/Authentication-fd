import React, { useState } from 'react';
import { Box, TextField, Button, Typography, IconButton, InputAdornment, Alert } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import set from '../../images/set.jpg';

const SetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email');

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3001/users?email=${email}`);
      if (response.data.length > 0) {
        const user = response.data[0];
        await axios.patch(`http://localhost:3001/users/${user.id}`, { password });
        setMessage('Password has been successfully reset.');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError('Email not found.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
      <Box
        sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: '#fff' }}
      >
        <Link to="/login" style={{ alignSelf: 'flex-start', marginBottom: 20, color: '#ff6600', textDecoration: 'none' }}>
          &lt; Back to login
        </Link>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#ff6600', marginBottom: 1 }}>
          Set a password
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 3, color: '#888' }}>
          Your previous password has been reset. Please set a new password for your account.
        </Typography>
        <TextField
          label="Create Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <TextField
          label="Re-enter Password"
          type={showConfirmPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ backgroundColor: '#ff6600', marginTop: 2 }}
          onClick={handleSubmit}
        >
          Set Password
        </Button>
        {message && <Alert severity="success" sx={{ marginTop: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>}
      </Box>
      <Box
        sx={{ flex: 1, display: { xs: 'none', md: 'block' }, backgroundImage: `url(${set})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
    </Box>
  );
};

export default SetPassword;
