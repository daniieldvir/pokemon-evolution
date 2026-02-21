import { FaHeart } from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";
import { useCompare } from "../../hooks/useCompare";
import { useFavorites } from "../../hooks/useFavorites";
import type { Pokemon } from "../../types/pokemon";
import { ActionIconButton } from "../UI/ActionIconButton/ActionIconButton";
import { StatRow } from "../UI/StatRowList/StatRowList";
import { Tag } from "../UI/Tag/Tag";
import "./BackPokemonCard.scss";

export const BackPokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { compareList, setCompareList } = useCompare();
  const isFav = favorites.some((p) => p.id === pokemon.id);
  const isComp = compareList.some((p) => p.id === pokemon.id);

  const statNames: Record<string, string> = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SpA",
    "special-defense": "SpD",
    speed: "SPD",
  };

  return (
    <div className="card-back">
      <div className="card-back-header">
        <div className="actions">
          <ActionIconButton
            selected={isFav}
            type="favorite"
            actionClicked={() => toggleFavorite(pokemon)}
            pokemon={pokemon}
            icon={<FaHeart />}
          />

          <ActionIconButton
            selected={isComp}
            type="compare"
            actionClicked={setCompareList}
            pokemon={pokemon}
            icon={<GiCrossedSwords />}
          />
        </div>
        <div className="back-header">
          <h3 className="back-name">{pokemon.name}</h3>
          <div className="back-meta">
            <span>{pokemon.height / 10}m</span>
            <span className="meta-dot">•</span>
            <span>{pokemon.weight / 10}kg</span>
          </div>
        </div>
      </div>

      <div className="back-stats">
        {pokemon.stats.map((stat) => (
          <StatRow key={stat.name} stat={stat} statNames={statNames} />
        ))}
      </div>

      <div className="back-abilities">
        <span className="back-section-title">Abilities</span>
        <div className="back-abilities-list">
          {pokemon.abilities.map((ability, i) => (
            <Tag key={i} type={ability.name} className="back-ability">
              {ability.is_hidden && <span className="hidden-star">★</span>}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
};
