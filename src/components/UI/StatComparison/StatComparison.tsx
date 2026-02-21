import type { Pokemon } from "../../../types/pokemon";
import "./StatComparison.scss";

type StatComparisonProps = {
  pokemon1: Pokemon;
  pokemon2: Pokemon;
};

export const StatComparison = ({ pokemon1, pokemon2 }: StatComparisonProps) => {
  const statNames = ["hp", "attack", "defense", "speed"];

  return (
    <div className="compare-stats">
      {statNames.map((statName) => {
        const s1 = pokemon1.stats.find((s) => s.name === statName)?.value || 0;
        const s2 = pokemon2.stats.find((s) => s.name === statName)?.value || 0;
        const max = Math.max(s1, s2, 1);

        return (
          <div key={statName} className="compare-stat-row">
            <div className="compare-stat-labels">
              <span>
                {statName} ({s1})
              </span>
              <span>
                {statName} ({s2})
              </span>
            </div>
            <div className="compare-stat-bar-container">
              <div
                className={`compare-stat-bar-left ${s1 > s2 ? "bg-win" : s1 === s2 ? "bg-tie" : "bg-lose"}`}
                style={{ width: `${(s1 / max) * 50}%` }}
              />
              <div
                className={`compare-stat-bar-right ${s2 > s1 ? "bg-win" : s2 === s1 ? "bg-tie" : "bg-lose"}`}
                style={{ width: `${(s2 / max) * 50}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
