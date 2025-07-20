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

let theme = responsiveFontSizes(createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif", // Use Poppins as the primary font
  },
}));

export default function MainLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="flex flex-col min-h-screen bg-blue-50">
        <Header />
        <SideNav />

        <Container maxWidth="lg" className="mt-4">
          <main className="m-0 sm:ml-16 xl:m-0">{children}</main>
        </Container>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
