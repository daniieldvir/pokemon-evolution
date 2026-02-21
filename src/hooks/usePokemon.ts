import { useEffect, useRef, useState } from "react";
import type { Pokemon } from "../types/pokemon";

const LIMIT = 20;

const fetchPokemonDetails = async (url: string): Promise<Pokemon> => {
  const res = await fetch(url);
  const data = await res.json();

  return {
    id: data.id,
    name: data.name,
    image:
      data.sprites.other["official-artwork"].front_default ??
      data.sprites.front_default,
    types: data.types.map((t: any) => t.type.name),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map((a: any) => ({
      name: a.ability.name,
      is_hidden: a.is_hidden,
    })),
    stats: data.stats.map((s: any) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    base_experience: data.base_experience,
  };
};

export const usePokemon = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    if (!hasMore || isFetchingRef.current) return;

    const fetchData = async () => {
      try {
        isFetchingRef.current = true;
        setLoading(true);

        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`,
        );
        const data = await res.json();

        if (!data.results.length) {
          setHasMore(false);
          return;
        }

        const details = await Promise.all(
          data.results.map((p: any) => fetchPokemonDetails(p.url)),
        );

        setPokemonList((prev) => [...prev, ...details]);
      } catch {
        setError("Failed to load Pokémon");
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    };

    fetchData();
  }, [offset, hasMore]);

  const lastPokemonRef = (node: HTMLDivElement | null) => {
    if (loading || !hasMore) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setOffset((prev) => prev + LIMIT);
      }
    });

    if (node) observerRef.current.observe(node);
  };

  return {
    pokemonList,
    loading,
    error,
    hasMore,
    lastPokemonRef,
  };
};
