import React from 'react';
import { Container, Box, Typography, TextField, IconButton, Grid, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { RestaurantOutlined, AddHomeWorkOutlined, LuggageOutlined, ApartmentOutlined, ExploreOutlined } from '@mui/icons-material';
import banner from '../../images/banner.jpg';

const categories = [
  { icon: <RestaurantOutlined sx={{ fontSize: 40, color: '#00C3FF', backgroundColor: 'white' }} />, label: 'Restaurants', description: 'Italian, Chinese, Mexican & many more' },
  { icon: <AddHomeWorkOutlined sx={{ fontSize: 40, color: '#00C3FF', backgroundColor: 'white' }} />, label: 'Hospitals', description: 'Pharmacy, Labs & more' },
  { icon: <LuggageOutlined sx={{ fontSize: 40, color: '#00C3FF', backgroundColor: 'white' }} />, label: 'Travel', description: 'Flights, Trains, Buses & more' },
  { icon: <ApartmentOutlined sx={{ fontSize: 40, color: '#00C3FF', backgroundColor: 'white' }} />, label: 'Hotels', description: 'From B&B to all inclusive & more' },
];

const Banner = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        position: 'relative',
        height: '100vh',
        display: 'grid',
        alignItems: 'center',
        justifyItems: 'center',
        textAlign: 'center',
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'auto',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          padding: { xs: 2, md: 4 },
          borderRadius: 2,
          width: { xs: '90%', md: '72%' },
          color: 'white',
          display: 'grid',
          gap: 2,
        }}
      >
        <Box sx={{ textAlign: 'left', padding: { xs: 1, md: 2 } }}>
          <Typography variant="h5" sx={{ fontFamily: 'Oleo Script, cursive', fontSize: { xs: '1.5rem', md: '2.5rem' } }}>
            Find your <span style={{ color: '#00C3FF' }}>Local</span> needs
          </Typography>
          <Typography variant="h5" sx={{ fontFamily: 'Oleo Script, cursive', fontSize: { xs: '1.5rem', md: '2.5rem' } }}>
            Let's uncover the best <span style={{ color: '#00C3FF' }}>places</span> to stay,
          </Typography>
          <Typography variant="h5" sx={{ fontFamily: 'Oleo Script, cursive', fontSize: { xs: '1.5rem', md: '2.5rem' } }}>
            eat, shop, or <span style={{ color: '#00C3FF' }}>visit</span>..!
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr auto' },
            gap: 2,
            alignItems: 'center',
            paddingRight: { xs: 0, md: 5 },
            marginBottom: 6,
          }}
        >
          <TextField
            variant="outlined"
            placeholder="What you'd like to find?"
            margin="dense"
            fullWidth
            
            size="small"
            InputProps={{
              sx: {
                backgroundColor: 'white',
                borderRadius: { xs: 5, md: 1 },
                fontSize: { xs: '0.8rem', md: '1rem' },
                height: 40,
                border: { xs: 'none', md: '1px solid rgba(0, 0, 0, 0.23)' },
                '&:hover':{
                  borderColor: '#00C3FF',
                  borderWidth: 2,
                }
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none', // Remove border for mobile view
                },
              },
            }}
          />
          <TextField
      variant="outlined"
      placeholder="Search your locality"
      margin="dense"
      fullWidth
      size="small"
      InputProps={{
        sx: {
          backgroundColor: 'white',
          borderRadius: { xs: 5, md: 1 },
          fontSize: { xs: '0.8rem', md: '1rem' },
          height: 40,
          border: { xs: 'none', md: '1px solid rgba(0, 0, 0, 0.23)' },
          '&:hover': {
            borderColor: '#00C3FF',
            borderWidth: 2,
          }
        },
        endAdornment: (
          <InputAdornment position="end">
            <LocationOnIcon
              sx={{
                fontSize: { xs: '0.9rem', md: '1.2rem' },
                color: '#00C3FF',
              }}
            />
          </InputAdornment>
        )
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: 'none', // Remove border for mobile view
          },
        },
      }}
    />
          
          <Box sx={{ display: 'flex', justifyContent: 'center', width: { xs: '100%', sm: 'auto' } }}>
            <IconButton
              color="primary"
              sx={{
                width: {xs:'100%',md:'100%'},
                height: 40,
                backgroundColor: '#00C3FF',
                borderRadius: {xs:5,md:1},
                color: 'whitesmoke',
                
                padding: '0 1rem',
                fontSize: { xs: '0.8rem', md: '1rem' },
                '&:hover': {
                  backgroundColor: '#47dce1',
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SearchIcon />
              <span style={{ fontSize: 16, marginLeft: 4 }}>Search</span>
            </IconButton>
          </Box>
        </Box>
        <Grid container justifyContent="space-between" spacing={1}>
          {categories.map((category, index) => (
            <Grid item key={index} xs={6} sm={4} md={2}>
              <Paper
                sx={{
                  padding: (theme) => theme.spacing(2, 0.5),
                  borderRadius: 2,
                  cursor: 'pointer',
                  textAlign: 'center',
                  width: '100%',
                  height: { xs: 120, sm: 140, md: 150 },
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    backgroundColor: 'white',
                    borderColor: '#00C3FF',
                    borderWidth: 1,
                    color: 'black',
                    borderStyle: 'solid',
                  },
                }}
              >
                {category.icon}
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', margin: {xs:0.5,md:1}, fontSize: { xs: '0.8rem', md: '1rem' } }}>{category.label}</Typography>
                {category.description && <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', md: '0.8rem' } }}>{category.description}</Typography>}
              </Paper>
            </Grid>
          ))}
          <Grid item xs={12} sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', marginTop: 2 }}>
            <Paper
              sx={{
                padding: 0,
                textAlign: 'center',
                alignContent: 'center',
                cursor: 'pointer',
                width: 100,
                height: 100,
                color: '#00C3FF',
                background: 'transparent',
              }}
            >
              <ExploreOutlined sx={{ fontSize: 40 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white', fontSize: '0.8rem' }}>Explore More</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} md={2} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Paper
              sx={{
                padding: 0,
                textAlign: 'center',
                alignContent: 'center',
                cursor: 'pointer',
                width: 150,
                height: 150,
                color: '#00C3FF',
                background: 'transparent',
              }}
            >
              <ExploreOutlined sx={{ fontSize: 40 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white', fontSize: '1rem' }}>Explore More</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Banner;
