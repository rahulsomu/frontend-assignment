import { Poppins } from "next/font/google";
import localFont from "next/font/local";

export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--poppins",
  });
  
  export const bespak = localFont({
    src: "./Bespax.otf",
    variable: "--bespak",
  });
  export const routhem = localFont({
    src: "./Routhem.otf",
    variable: "--routhem",
  });
  export const northden = localFont({
    src: "./NORTHDENROUGH.ttf",
    variable: "--northden",
  });