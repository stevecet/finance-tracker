import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import SideNav from "./SideNav";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif", // Use Poppins as the primary font
  },
});

export default function MainLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
      <div className="flex flex-col min-h-screen bg-blue-50">
        <Header />
        <SideNav />
        <main className="m-0 sm:ml-16 xl:m-0">{children}</main>
        <Footer/>
      </div>
    </ThemeProvider>
  );
}
