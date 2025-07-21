import Header from "./Header";
import Footer from "./Footer";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
  responsiveFontSizes,
} from "@mui/material";
import SideNav from "./SideNav";
import { useState, useMemo, useEffect } from "react";
import SearchResultBanner from "../components/SearchResultBanner";

export default function MainLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode !== null) setDarkMode(JSON.parse(storedMode));
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const theme = useMemo(() => {
    return responsiveFontSizes(
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          background: {
            default: darkMode ? "#121212" : "#f0f4ff", // match Tailwind `bg-blue-50`
          },
        },
        typography: {
          fontFamily: "Poppins, Arial, sans-serif",
        },
      })
    );
  }, [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Apply dark mode class for Tailwind */}
      <div
        className={
          darkMode
            ? "dark flex flex-col min-h-screen bg-gray-900 text-white transition-colors duration-300"
            : "flex flex-col min-h-screen bg-blue-50 text-black"
        }
      >
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <SearchResultBanner />
        <SideNav darkMode={darkMode} />

        <Container maxWidth="lg" className="mt-4">
          <main className="m-0 sm:ml-16 xl:m-0">{children}</main>
        </Container>
        <Footer darkMode={darkMode} />
      </div>
    </ThemeProvider>
  );
}
