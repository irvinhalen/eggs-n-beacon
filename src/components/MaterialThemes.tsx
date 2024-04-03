import { createTheme } from "@mui/material";

export const blackTheme = createTheme({
    palette: {
        primary: {
            main: '#000000'
        }
    }
});

export const authTheme = createTheme({
    palette: {
        primary: {
            main: '#019B63'
        }
    },
    typography: {
        button: {
            textTransform: 'none'
        },
        fontSize: 20,
    }
});

export const greenTheme = createTheme({
    palette: {
        primary: {
            main: '#019B63'
        }
    }
});

export const redTheme = createTheme({
    palette: {
        primary: {
            main: '#E72423'
        }
    }
});
