import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Checkbox, FormControlLabel, Typography, IconButton, InputAdornment } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import signupp from '../../images/signupp.jpg'; 
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = 'First Name is required';
    if (!formData.lastName) tempErrors.lastName = 'Last Name is required';
    if (!formData.email) tempErrors.email = 'Email is required';
    if (!formData.phoneNumber) tempErrors.phoneNumber = 'Phone Number is required';
    if (!formData.password) tempErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = 'Passwords do not match';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Check if the email or phone number already exists
        const emailExists = await axios.get(`http://localhost:3001/users?email=${formData.email}`);
        const phoneNumberExists = await axios.get(`http://localhost:3001/users?phoneNumber=${formData.phoneNumber}`);
        
        if (emailExists.data.length > 0) {
          setErrors({ ...errors, email: 'Email already exists' });
          return;
        }
        
        if (phoneNumberExists.data.length > 0) {
          setErrors({ ...errors, phoneNumber: 'Phone number already exists' });
          return;
        }
  
        // If email and phone number are unique, proceed with user creation
        const response = await axios.post('http://localhost:3001/users', formData);
        console.log('User created:', response.data);
        navigate('/login');
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
  };
  
  return (
    <Box sx={{ display: 'flex', height: '100vh', padding: 0, minWidth: '100vw', flexDirection: { xs: 'column', md: 'row' } }}>
      <Box
        sx={{
          flex: 2,
          display: { xs: 'none', md: 'block' },
          backgroundImage: `url(${signupp})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          position: 'relative'
        }}
      >
        <Box sx={{ position: 'absolute', bottom: 50, left: 80, bgcolor: 'white', p: 0.2 }}>
          <img src={signupp} alt="Sign Up" style={{ width: 130, height: 200, borderRadius: 5, objectFit: 'cover' }} />
        </Box>
      </Box>
      <Box
        sx={{
          flex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: { xs: 2, sm: 4 },
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#ff6600' }}>Sign Up</Typography>
        <Typography variant="body1" sx={{ marginBottom: 3, color: '#888', textAlign: 'center' }}>
          Let's get you all set up so you can access your personal account.
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                label="First Name"
                variant="outlined"
                fullWidth
                margin="dense"
                size="small"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="dense"
                size="small"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="dense"
                size="small"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="phoneNumber"
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="dense"
                size="small"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
            </Grid>
          </Grid>
          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="dense"
            size="small"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
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
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="dense"
            size="small"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel control={<Checkbox />} label="I agree to all the Terms and Privacy Policies" />
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ backgroundColor: '#ff6600', marginBottom: 2 }}>Create account</Button>
        </form>
        <Link to="/login" style={{ textDecoration: 'none', color: '#ff6600', marginBottom: 2 }}>
          Already have an account? Login
        </Link>
        <Typography variant="body2" marginTop={2}>Or sign up with</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 1 }}>
          <Button startIcon={<FacebookIcon />} variant="outlined" sx={{ marginRight: 1 }}></Button>
          <Button startIcon={<GoogleIcon />} variant="outlined" sx={{ marginRight: 1 }}></Button>
          <Button startIcon={<AppleIcon />} variant="outlined"></Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
