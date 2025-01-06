import React from 'react';
import NewsPage from '../News/NewsPage';  
import { Box, Container } from '@mui/material';  

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 2 }}>
        <NewsPage /> 
      </Box>
    </Container>
  );
}

export default Home;
