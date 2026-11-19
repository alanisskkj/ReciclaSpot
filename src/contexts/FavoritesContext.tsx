import React, { createContext, useContext, useMemo, useState } from 'react';
import { PontoColeta } from '../types/navigations';

type FavoritesContextValue = {
  favorites: PontoColeta[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (ponto: PontoColeta) => void;
  removeFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: React.PropsWithChildren) {
  const [favorites, setFavorites] = useState<PontoColeta[]>([]);

  const isFavorite = (id: string) => favorites.some((ponto) => ponto.id === id);

  const toggleFavorite = (ponto: PontoColeta) => {
    setFavorites((atuais) =>
      atuais.some((favorito) => favorito.id === ponto.id)
        ? atuais.filter((favorito) => favorito.id !== ponto.id)
        : [...atuais, ponto]
    );
  };

  const removeFavorite = (id: string) => {
    setFavorites((atuais) => atuais.filter((ponto) => ponto.id !== id));
  };

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, removeFavorite }),
    [favorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de FavoritesProvider.');
  }
  return context;
}
