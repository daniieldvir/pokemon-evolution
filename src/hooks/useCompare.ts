import { useEffect, useState } from "react";
import type { Pokemon } from "../types/pokemon";

let sharedCompareList: Pokemon[] = [];
const listeners = new Set<() => void>();

const notifyListeners = () => listeners.forEach((fn) => fn());

export const useCompare = () => {
  const [compareList, setCompareListState] =
    useState<Pokemon[]>(sharedCompareList);

  useEffect(() => {
    const update = () => setCompareListState([...sharedCompareList]);
    listeners.add(update);

    return () => {
      listeners.delete(update);
    };
  }, []);

  const setCompareList = (pokemon: Pokemon) => {
    const exists = sharedCompareList.some((p) => p.id === pokemon.id);

    sharedCompareList = exists
      ? sharedCompareList.filter((p) => p.id !== pokemon.id)
      : sharedCompareList.length < 2
        ? [...sharedCompareList, pokemon]
        : [sharedCompareList[1], pokemon];

    notifyListeners();
  };

  const clearCompareList = () => {
    sharedCompareList = [];
    notifyListeners();
  };

  return { compareList, setCompareList, clearCompareList };
};
