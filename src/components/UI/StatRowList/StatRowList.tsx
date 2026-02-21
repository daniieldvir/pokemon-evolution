import "./StatRowList.scss";
import type { Stat } from "../../../types/pokemon";

interface StatRowProps {
  stat: Stat;
  statNames?: Record<string, string>;
}

export const StatRow = ({ stat, statNames = {} }: StatRowProps) => {
  return (
    <>
      <div key={stat.name} className="back-stat-row">
        <span className="back-stat-name">
          {statNames[stat.name] || stat.name}
        </span>
        <div className="back-stat-bar-container">
          <div
            className="back-stat-bar"
            style={{ width: `${(stat.value / 255) * 100}%` }}
          />
        </div>
        <span className="back-stat-value">{stat.value}</span>
      </div>
    </>
  );
};
