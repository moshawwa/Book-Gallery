import { createContext, useContext, useState } from "react";

export type ThemeContextProps = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    // setTheme((curr) => (curr === "darkTheme" ? "lightTheme" : "darkTheme"));
    setTheme(theme === "dark" ? "light" : "dark");
    document.body.classList.toggle("dark-mode");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
