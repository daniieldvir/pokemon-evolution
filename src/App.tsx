import { useEffect, useState } from "react";
import "./App.scss";
import { CompareModal } from "./components/CompareModal/CompareModal";
import { ComparisonNotice } from "./components/CompareModal/ComparisonNotice";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import Loader from "./components/UI/Loader/Loader";
import { PokedexBall } from "./components/UI/PokedexBall/PokedexBall";
import { useCompare } from "./hooks/useCompare";
import { useFavorites } from "./hooks/useFavorites";
import { usePokemon } from "./hooks/usePokemon";

function App() {
  const { pokemonList, loading, error, hasMore, lastPokemonRef } = usePokemon();

  const { favorites } = useFavorites();
  const { compareList, clearCompareList } = useCompare();
  const [showCompareModal, setShowCompareModal] = useState(false);

  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    if (compareList.length === 2) {
      setShowCompareModal(true);
    } else {
      setShowCompareModal(false);
    }
  }, [compareList.length]);

  const handleCloseModal = () => {
    setShowCompareModal(false);
    clearCompareList();
  };

  const displayList = showFavorites ? favorites : pokemonList;

  return (
    <div className="app">
      <h1 className="app-title">Pokémon Evolution</h1>

      <button
        className={`pokedex-button ${showFavorites ? "active" : ""}`}
        onClick={() => setShowFavorites(!showFavorites)}
      >
        <PokedexBall animated={false} small={true} /> My Pokedex
      </button>

      {compareList.length === 1 && (
        <ComparisonNotice
          pokemon={compareList[0]}
          clearCompareList={clearCompareList}
        />
      )}

      <main className="pokemon-grid">
        {displayList.map((pokemon, index) => {
          const isLast = !showFavorites && index === displayList.length - 1;

          return (
            <div
              key={`${pokemon.id}-${index}`}
              ref={isLast ? lastPokemonRef : undefined}
            >
              <PokemonCard pokemon={pokemon} />
            </div>
          );
        })}
      </main>

      {showCompareModal && compareList.length === 2 && (
        <CompareModal
          pokemon1={compareList[0]}
          pokemon2={compareList[1]}
          onClose={handleCloseModal}
        />
      )}

      {!showFavorites && loading && <Loader label="Loading Pokemon..." />}
      {!showFavorites && error && <p className="error-text">{error}</p>}
      {!showFavorites && !hasMore && (
        <p className="end-text">No more Pokemon</p>
      )}
      {showFavorites && favorites.length === 0 && (
        <p
          className="end-text"
          style={{ textAlign: "center", marginTop: "40px" }}
        >
          No favorite pokemon caught yet!
        </p>
      )}
    </div>
  );
}

export default App;
