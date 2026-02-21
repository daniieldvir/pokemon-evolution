import { typeColor } from "../constants/typeColor";

export const getTypeColor = (type: string) => {
  const colors: Record<string, string> = typeColor;
  return colors[type] || "#68A090";
};
