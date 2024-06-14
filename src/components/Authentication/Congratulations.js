// Congratulations.js
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Congratulations = () => {
  const navigate = useNavigate();

  const handleGo = () => {
    navigate('/home');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor: '#fff',
        textAlign: 'center',
        padding: 3
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            color: '#ff6600',
            marginBottom: 2,
            fontSize: {
              xs: '2rem', // small screens
              sm: '3rem', // medium screens
              md: '4rem', // large screens
              lg: '5rem', // extra large screens
            }
          }}
        >
          Congratulations!
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: 3,
            color: '#000',
            fontSize: {
              xs: '1.25rem', // small screens
              sm: '1.5rem', // medium screens
              md: '2rem', // large screens
              lg: '2.5rem', // extra large screens
            }
          }}
        >
          You’re all set!
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#ff6600',
            paddingX: 5,
            fontSize: {
              xs: '0.75rem', // small screens
              sm: '0.875rem', // medium screens
              md: '1rem', // large screens
              lg: '1.125rem', // extra large screens
            }
          }}
          onClick={handleGo}
        >
          Let’s Go
        </Button>
      </motion.div>
    </Box>
  );
};

export default Congratulations;
