import "styled-components/native";
declare module "styled-components/native" {
  export interface DefaultTheme {
    isDark: boolean;
    mainBgColor: string;
    textColor: string;
    accentColor: string;
    subTextColor: string;
    cardBgColor: string;
  }
}
