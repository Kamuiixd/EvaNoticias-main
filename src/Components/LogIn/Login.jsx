import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
    navigate('/home');
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 5,
          marginBottom: 5, 
          backgroundColor: '#fff',
          borderRadius: 3,
          boxShadow: 3,
          padding: 4,
          background: 'linear-gradient(135deg,rgb(167, 147, 147),rgb(93, 189, 192))',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#333' }}>
          Iniciar sesión
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Correo electrónico"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '30px', 
              },
            }}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '30px', 
              },
            }}
          />
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              background: 'linear-gradient(135deg,rgb(167, 147, 147),rgb(93, 189, 192))',
              borderRadius: '30px',
              '&:hover': {
                background: 'linear-gradient(135deg,rgb(167, 147, 147),rgb(93, 189, 192))',
              },
            }}
          >
            Iniciar sesión
          </Button>
        </form>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="textSecondary">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" style={{ textDecoration: 'none', color: '#3f51b5' }}>
              Crear cuenta
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
