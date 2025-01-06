import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import PaginatedNewsCards from '../Pagination/PaginatedNewsCards';

function CategoryPage() {
  const { categoryName } = useParams();
  const [loading, setLoading] = useState(true);

  const categoryTranslations = {
    technology: 'Tecnología',
    sports: 'Deportes',
    politics: 'Política',
    health: 'Salud',
    entertainment: 'Entretenimiento',
    business: 'Negocios',
    science: 'Ciencia',
    world: 'Mundo',
  };


  const translatedCategory = categoryTranslations[categoryName] || categoryName;

  useEffect(() => {
    setLoading(false);
  }, [categoryName]);

  return (
    <Box
      sx={{
        padding: { xs: 2, md: 3 }, 
        backgroundColor: '#f5f7fa',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 1200,
          borderRadius: 3,
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          padding: { xs: 2, md: 4 },
          backgroundColor: '#ffffff',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            color: '#000',
            marginBottom: 4,
            fontSize: { xs: '1.5rem', md: '2rem' },
          }}
        >
          Noticias en la categoría: {translatedCategory}
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            <PaginatedNewsCards category={categoryName} />
          </Grid>
        )}
      </Card>
    </Box>
  );
}

export default CategoryPage;
