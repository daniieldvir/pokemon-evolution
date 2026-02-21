import "./PokedexBall.scss";

type PokedexBallProps = {
  animated?: boolean;
  small?: boolean;
};

export const PokedexBall = ({
  animated = true,
  small = false,
}: PokedexBallProps) => {
  return (
    <div
      className={`pokeball-loader ${animated ? "" : "no-animation"} ${small ? "small" : ""}`}
    >
      <div className="pokeball-top"></div>
      <div className="pokeball-bottom"></div>
      <div className="pokeball-center-outer">
        <div className="pokeball-center-inner"></div>
      </div>
    </div>
  );
};
