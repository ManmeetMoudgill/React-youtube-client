export const darkTheme: Theme = {
  bg: "#181818",
  bgLighter: "#202020",
  text: "#f9f9f9",
  textSoft: "#aaaaaa",
  soft: "#373737",
};
export const lightTheme: Theme = {
  bg: "white",
  bgLighter: "white",
  text: "black",
  textSoft: "#606060",
  soft: "#f5f5f5",
};

export interface Theme {
  bg: string;
  bgLighter: string;
  text: string;
  textSoft: string;
  soft: string;
}
