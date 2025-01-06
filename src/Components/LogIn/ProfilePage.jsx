import React from 'react';
import { Box, Card, CardContent, Typography, Divider, Avatar, Grid } from '@mui/material';
import { useUser } from './UserContext';  
import { Email, AccountCircle, Lock } from '@mui/icons-material'; 

const ProfilePage = () => {
  const { user } = useUser(); 

  if (!user) {
    return <Typography variant="h6" align="center">No has iniciado sesión.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 5 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          {/* Avatar del Usuario */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Avatar sx={{ width: 100, height: 100 }} alt={user.username} src="/static/images/avatar.png" />
          </Box>

          <Typography variant="h5" align="center" sx={{ mb: 2 }}>
            Perfil de Usuario
          </Typography>

          <Divider sx={{ mb: 2 }} />

    
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>Nombre de Usuario</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountCircle sx={{ mr: 1 }} />
                <Typography variant="body2">{user.username}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>Correo Electrónico</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ mr: 1 }} />
                <Typography variant="body2">{user.email}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>Contraseña</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Lock sx={{ mr: 1 }} />
                <Typography variant="body2">*******</Typography> 
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
