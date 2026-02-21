import type { Pokemon } from "../../../types/pokemon";
import "./ActionIconButton.scss";

type ActionIconButtonProps = {
  selected: boolean;
  pokemon: Pokemon;
  type: "favorite" | "compare";
  icon: React.ReactNode;
  actionClicked: (pokemon: Pokemon) => void;
};

export const ActionIconButton = ({
  selected,
  pokemon,
  type,
  icon,
  actionClicked,
}: ActionIconButtonProps) => {
  const handleActionClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    actionClicked(pokemon);
  };

  const className = `action-icon-btn ${type}-btn ${selected ? "selected" : "not-selected"}`;

  return (
    <button className={className} onClick={handleActionClicked}>
      {icon}
    </button>
  );
};
