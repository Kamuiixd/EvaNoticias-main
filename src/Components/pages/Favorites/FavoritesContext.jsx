import React, { createContext, useContext, useState } from 'react';


const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (article) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some(fav => fav.url === article.url)) {
        return prevFavorites.filter(fav => fav.url !== article.url);
      } else {
        return [...prevFavorites, article];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
