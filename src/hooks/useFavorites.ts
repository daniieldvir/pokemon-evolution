import { useEffect, useState } from "react";
import type { Pokemon } from "../types/pokemon";

let sharedFavorites: Pokemon[] = [];
const listeners = new Set<() => void>();

const notifyListeners = () => listeners.forEach((fn) => fn());

const loadFromStorage = (): Pokemon[] => {
  try {
    const stored = localStorage.getItem("pokemon-favorites");
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to parse favorites", e);
    return [];
  }
};

sharedFavorites = loadFromStorage();

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Pokemon[]>(sharedFavorites);

  useEffect(() => {
    const update = () => setFavorites([...sharedFavorites]);
    listeners.add(update);
    return () => void listeners.delete(update);
  }, []);

  const toggleFavorite = (pokemon: Pokemon) => {
    const exists = sharedFavorites.some((p) => p.id === pokemon.id);

    sharedFavorites = exists
      ? sharedFavorites.filter((p) => p.id !== pokemon.id)
      : [...sharedFavorites, pokemon];

    localStorage.setItem("pokemon-favorites", JSON.stringify(sharedFavorites));
    notifyListeners();
  };

  const isFavorite = (pokemonId: number) => {
    return sharedFavorites.some((p) => p.id === pokemonId);
  };

  return { favorites, toggleFavorite, isFavorite };
};
