import type { Pokemon } from "../../types/pokemon";
import { getTypeColor } from "../../utils/utils";
import { Tag } from "../UI/Tag/Tag";
import { BackPokemonCard } from "./BackPokemonCard";
import "./PokemonCard.scss";

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const primaryType = pokemon.types[0] || "normal";
  const cardColor = getTypeColor(primaryType);

  return (
    <div
      className="pokemon-card"
      style={{ "--card-color": cardColor } as React.CSSProperties}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className="card-header">
            <span className="pokemon-id">
              #{String(pokemon.id).padStart(3, "0")}
            </span>
            <div className="pokemon-types">
              {pokemon.types.map((type) => (
                <Tag key={type} type={type} />
              ))}
            </div>
          </div>

          <div className="card-image-container">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="pokemon-image"
              loading="lazy"
            />
          </div>

          <div className="card-footer">
            <h3 className="pokemon-name">{pokemon.name}</h3>
            <div className="pokemon-stats-preview">
              <span className="stat-item">
                <span className="stat-label">HP</span>
                <span className="stat-value">
                  {pokemon.stats.find((s) => s.name === "hp")?.value || 0}
                </span>
              </span>
              <span className="stat-item">
                <span className="stat-label">ATK</span>
                <span className="stat-value">
                  {pokemon.stats.find((s) => s.name === "attack")?.value || 0}
                </span>
              </span>
            </div>
          </div>
        </div>
        <BackPokemonCard pokemon={pokemon} />
      </div>
    </div>
  );
};

export default PokemonCard;
