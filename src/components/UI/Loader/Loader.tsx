import "./Loader.scss";
import { PokedexBall } from "../PokedexBall/PokedexBall";

const Loader = ({ label }: { label: string }) => {
  return (
    <div className="loader-container">
      <PokedexBall />
      <p className="loader-text">{label}</p>
    </div>
  );
};

export default Loader;
