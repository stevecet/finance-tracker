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

let theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: "Poppins, Arial, sans-serif", // Use Poppins as the primary font
    },
  })
);

export default function AuthLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main className="m-0 sm:ml-16 xl:m-0">{children}</main>
    </ThemeProvider>
  );
}
