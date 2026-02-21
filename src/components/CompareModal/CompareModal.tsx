import type { Pokemon } from "../../types/pokemon";
import { StatComparison } from "../UI/StatComparison/StatComparison";
import "./CompareModal.scss";

export const CompareModal = ({
  pokemon1,
  pokemon2,
  onClose,
}: {
  pokemon1: Pokemon;
  pokemon2: Pokemon;
  onClose: () => void;
}) => {
  return (
    <div className="compare-overlay" onClick={onClose}>
      <div className="compare-modal" onClick={(e) => e.stopPropagation()}>
        <button className="compare-close" onClick={onClose}>
          ✕
        </button>
        <h2 className="compare-title">Battle Comparison </h2>

        <div className="compare-grid">
          <div className="compare-pokemon">
            <div className="compare-image-container">
              <img
                src={pokemon1.image}
                alt={pokemon1.name}
                className="compare-image"
              />
            </div>
            <h3 className="compare-name">{pokemon1.name}</h3>
          </div>

          <div className="compare-pokemon">
            <div className="compare-image-container">
              <img
                src={pokemon2.image}
                alt={pokemon2.name}
                className="compare-image"
              />
            </div>
            <h3 className="compare-name">{pokemon2.name}</h3>
          </div>
        </div>
        <StatComparison pokemon1={pokemon1} pokemon2={pokemon2} />
      </div>
    </div>
  );
};
