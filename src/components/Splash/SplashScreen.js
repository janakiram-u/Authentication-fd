import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Splash1 from '../../images/Splash1.png';
import Splash2 from '../../images/Splash2.png';

const SplashScreen = () => {
  const [currentImage, setCurrentImage] = useState(Splash1);
  const [objectFit, setObjectFit] = useState('cover');
  const [showImage, setShowImage] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const transitionImages = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2980)); // Delay just before switching
      setShowImage(false); // Hide the first image

      await new Promise((resolve) => setTimeout(resolve, 20)); // Small delay to ensure smooth transition
      setCurrentImage(Splash2);
      setObjectFit('contain');
      setShowImage(true); // Show the second image

      await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for another 3 seconds
      navigate('/sign-up');
    };

    transitionImages();
  }, [navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        backgroundColor: '#fff',
      }}
    >
      {showImage && (
        <Box
          component="img"
          src={currentImage}
          alt="Splash"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: objectFit,
          }}
        />
      )}
    </Box>
  );
};

export default SplashScreen;

