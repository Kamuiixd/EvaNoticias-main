import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Typography, Pagination, IconButton, Grid } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useFavorites } from '../../pages/Favorites/FavoritesContext';

const PaginatedNewsCards = ({ category }) => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 5;

  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=84aaa44ac13c4af4ae63cf45fcd788ad`
        );
        const data = await response.json();
        if (data.articles) {
          setNews(data.articles);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = news.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(news.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6">Cargando noticias...</Typography>
      </Box>
    );
  }

  if (news.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6">No hay noticias disponibles en esta categoría.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '100%', margin: 'auto', p: 2 }}>
      <Grid container spacing={3}>
        {currentNews.map((article, index) => {
          const isFavorite = favorites.some(fav => fav.url === article.url); 

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardMedia
                  component="img"
                  alt={article.title}
                  image={article.urlToImage || '/static/images/placeholder.jpg'}
                  sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom noWrap>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {article.description || 'No hay descripción disponible.'}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    href={article.url}
                    target="_blank"
                    sx={{ mt: 1 }}
                  >
                    Leer Más
                  </Button>

                  {/* Botón de favoritos */}
                  <IconButton
                    onClick={() => toggleFavorite(article)} 
                    color={isFavorite ? 'error' : 'default'} 
                    sx={{ mt: 1, ml: 2 }}
                  >
                    {isFavorite ? <Favorite /> : <FavoriteBorder />} 
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default PaginatedNewsCards;
