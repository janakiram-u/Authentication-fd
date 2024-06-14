import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import forgot from '../../images/forgot.jpg';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setMessage(''); // Clear message when email changes
    setError(''); // Clear error when email changes
  };

  const handleSubmit = async () => {
    if (!email) {
      setError('Please enter your email.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/users?email=${email}`);
      if (response.data.length > 0) {
        setMessage('A reset code has been sent to your email.');
        setTimeout(() => navigate(`/verify-code?email=${email}`), 3000); // Redirect to VerifyCode after 3 seconds
      } else {
        setError('Email not found.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100vh' }}>
      <Box
        sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: { xs: 3, md: 5 } }}
      >
        <Link to="/login" style={{ alignSelf: 'flex-start', marginBottom: 20, textDecoration: 'none' }}>
          &lt; Back to login
        </Link>
        <Typography variant="h4" gutterBottom color="#ff6600">Forgot your password?</Typography>
        <Typography variant="body1" marginBottom={2} color="gray" align="center">
          Don't worry, happens to all of us. Enter your email below to recover your password.
        </Typography>
        <Grid item xs={12} sm={6} width='100%' marginBottom={3}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleChange}
          />
        </Grid>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ backgroundColor: '#ff6600', marginBottom: 2 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <Typography variant="body2" marginTop={2} color="gray">Or login with</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 1 }}>
          <Button startIcon={<FacebookIcon />} variant="outlined" sx={{ marginRight: 1 }}></Button>
          <Button startIcon={<GoogleIcon />} variant="outlined" sx={{ marginRight: 1 }}></Button>
          <Button startIcon={<AppleIcon />} variant="outlined"></Button>
        </Box>
      </Box>
      <Box
        sx={{ flex: 1, display: { xs: 'none', md: 'block' }, backgroundImage: `url(${forgot})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}
      >
        <Box
          sx={{ position: 'absolute', bottom: { xs: 8, md: 16 }, left: '50%', transform: 'translateX(-50%)', height: { xs: '150px', md: '200px' }, width: { xs: '100px', md: '150px' }, backgroundImage: `url(${forgot})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '2px solid white', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}
        />
      </Box>
    </Box>
  );
};

export default ForgotPassword;
