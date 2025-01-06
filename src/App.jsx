import { useState, useMemo } from 'react';
import './App.css';
import Header from './Components/layout/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './Components/layout/Footer/Footer';
import CategoryPage from './Components/pages/Category/CategoryPage';
import Home from './Components/pages/Home/home';
import SearchPage from './Components/pages/Search/SearchPage';
import { SearchProvider } from './Components/pages/Search/SearchContext';
import { FavoritesProvider } from './Components/pages/Favorites/FavoritesContext';
import FavoritesPage from './Components/pages/Favorites/FavoritesPage';
import Login from './Components/LogIn/Login';
import Register from './Components/LogIn/Register';
import ProfilePage from './Components/LogIn/ProfilePage';
import { UserProvider } from './Components/LogIn/UserContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material'; 

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);


  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };


  const theme = useMemo(() => createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  }), [isDarkMode]);

  return (
    <ThemeProvider theme={theme}>  
      <UserProvider>
        <FavoritesProvider>
          <Router>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <SearchProvider>
                <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Box sx={{ flexGrow: 1 }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/category/:categoryName" element={<CategoryPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<ProfilePage />} />
                  </Routes>
                </Box>
                <Footer />
              </SearchProvider>
            </Box>
          </Router>
        </FavoritesProvider>
      </UserProvider>
    </ThemeProvider> 
  );
}

export default App;
