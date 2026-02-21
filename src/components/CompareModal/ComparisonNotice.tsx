import type { Pokemon } from "../../types/pokemon";
import { getTypeColor } from "../../utils/utils";
import "./ComparisonNotice.scss";

type ComparisonNoticeProps = {
  pokemon: Pokemon;
  clearCompareList: () => void;
};

export const ComparisonNotice = ({
  pokemon,
  clearCompareList,
}: ComparisonNoticeProps) => {
  const pokemonColor = getTypeColor(pokemon.types[0]);

  return (
    <div className="comparison-notice">
      <span className="comparison-notice-text">
        Select one more Pokemon to battle{" "}
        <strong style={{ color: pokemonColor }}>{pokemon.name}</strong>!
      </span>
      <button onClick={clearCompareList} className="comparison-notice-button">
        X
      </button>
    </div>
  );
};
