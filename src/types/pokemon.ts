export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  abilities: Ability[];
  stats: Stat[];
  base_experience: number;
}

export interface Ability {
  name: string;
  is_hidden: boolean;
}

export interface Stat {
  name: string;
  value: number;
}

export interface PokemonListItem {
  name: string;
  url: string;
}
