import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mode: string;
    bgColor: { main: string; secondary: string; point: string };
    textColor: { main: string; secondary: string };
    accentColor: string;
    boxShadowColor: { main: string; secondary: string; point: string };
    componentColor: string;
  }
}
