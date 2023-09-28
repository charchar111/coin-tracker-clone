import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  mode: "darkTheme",
  bgColor: { main: "#2d3436", secondary: "#3e4446", point: "#6c5ce7" },
  textColor: { main: "#dfe6e9", secondary: "#b2bec3" },
  accentColor: "#0984e3",
  boxShadowColor: {
    main: "rgba(44,62,80,0.5)",
    secondary: "rgba(44,62,80,0.5)",
    point: "#6c5ce7",
  },
  componentColor: "#212121",
};

export const lightTheme: DefaultTheme = {
  mode: "lightTheme",
  bgColor: { main: "#eeeeee", secondary: "#e3e4e4", point: "#8071eb" },
  textColor: { main: "#2d3436", secondary: "#636e72" },
  accentColor: "#0984e3",
  boxShadowColor: {
    main: "rgba(44,62,80,0.5)",
    secondary: "rgba(44,62,80,0.5)",
    point: "rgba(108,92,231,0.3)",
  },
  componentColor: "#eeeeee",
};
