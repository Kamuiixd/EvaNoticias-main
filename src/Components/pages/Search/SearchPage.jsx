import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';  // Hook para acceder a los parámetros de la URL
import { Box, Typography, Card, CardContent, CardMedia, CircularProgress, Grid, Paper, Pagination } from '@mui/material';

const SearchPage = () => {
  const [searchParams] = useSearchParams(); 
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const searchQuery = searchParams.get('q') || '';  

  const itemsPerPage = 5;  

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=84aaa44ac13c4af4ae63cf45fcd788ad`
        );
        const data = await response.json();
        setSearchResults(data.articles || []);
      } catch (error) {
        console.error('Error al obtener los resultados de búsqueda:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(searchResults.length / itemsPerPage);  

  const handleChangePage = (event, value) => {
    setCurrentPage(value);  
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Buscar Noticias
      </Typography>

      <Box sx={{ marginTop: 3 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Resultados para: "{searchQuery}"
            </Typography>
            {searchResults.length === 0 ? (
              <Paper sx={{ padding: 2, marginTop: 2, textAlign: 'center' }}>
                <Typography>No se encontraron noticias.</Typography>
              </Paper>
            ) : (
              <>
                <Grid container spacing={3}>
                  {currentNews.map((article, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card sx={{ height: '100%', boxShadow: 3 }}>
                        <CardMedia
                          component="img"
                          alt={article.title}
                          image={article.urlToImage || '/static/images/placeholder.jpg'}
                          sx={{ height: 200, objectFit: 'cover' }}
                        />
                        <CardContent>
                          <Typography variant="h6" noWrap gutterBottom>
                            {article.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {article.description || 'No hay descripción disponible.'}
                          </Typography>
                          <Box sx={{ mt: 2, textAlign: 'right' }}>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                              <Typography variant="body2" color="primary">
                                Leer Más
                              </Typography>
                            </a>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handleChangePage}
                    color="primary"
                  />
                </Box>
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default SearchPage;
