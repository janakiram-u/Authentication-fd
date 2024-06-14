import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import verify from '../../images/verify.jpg'; // Ensure the path to your image is correct
import { Alert } from '@mui/material';

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email');
  const dummyCode = '123456'; // Dummy verification code

  const handleVerify = () => {
    if (code === dummyCode) {
      navigate(`/set-password?email=${email}`);
    } else {
      setError('Invalid verification code.');
    }
  };

  const handleResend = () => {
    // Handle the resend code logic here
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
          backgroundColor: '#fff'
        }}
      >
        <Link
          href="/login"
          sx={{ alignSelf: 'flex-start', marginBottom: 2, textDecoration: 'none' }}
        >
          &lt; Back to login
        </Link>
        <Typography variant="h4" gutterBottom sx={{alignSelf: 'flex-start', fontWeight: 'bold', color: '#ff6600', marginBottom: 1 }}>
          Verify code
        </Typography>
        <Typography variant="body1" sx={{alignSelf: 'flex-start', marginBottom: 3, color: '#888' }}>
          An authentication code has been sent to your email.
        </Typography>
        <TextField
          label="Enter Code"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Link
          href="#"
          onClick={handleResend}
          sx={{ alignSelf: 'flex-start', marginBottom: 2, color: '#ff6600', textDecoration: 'none' }}
        >
          Didn't receive a code? Resend
        </Link>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ backgroundColor: '#ff6600', marginTop: 2 }}
          onClick={handleVerify}
        >
          Verify
        </Button>
        {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>}
      </Box>
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'block' },
          backgroundImage: `url(${verify})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 8, md: 16 }, // Adjusted position for responsiveness
            left: '50%',
            transform: 'translateX(-50%)',
            height: { xs: '150px', md: '200px' }, // Adjusted size for responsiveness
            width: { xs: '100px', md: '150px' }, // Adjusted size for responsiveness
            backgroundImage: `url(${verify})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2px solid white',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
          }}
        />
      </Box>
    </Box>
  );
};

export default VerifyCode;
