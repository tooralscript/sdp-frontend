import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // A lighter blue that works well on dark backgrounds
    },
    background: {
      default: "#0A1929", // Dark blue background
      paper: "#132f4c", // Slightly lighter blue for cards and surfaces
    },
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#132f4c",
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(19, 47, 76, 0.4)",
          backgroundImage: "none",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      },
    },
  },
});
