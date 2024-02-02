// color design tokens export
export const tokensDark = {
  lightGrayHome: "#616060",
  darkGrayHome: "#272727",
  bgHomeDark: "#0F0F0F",
  searchHomeDark: "#121212",
  borderHomeDark: "#303030",
  textPrimaryDark: "#F1F1F1",
  loginBlue: "#1a73e8",
  loginBorder: "#dadce0",
  loginText: "#202124",
  loginPlaceholder: "#5f6368",

  studioBorder: "#ffffff1a",
  studioRed: "#FF4E45",
  studioGray: "#AAAAAA",
  studioBackground: "#282828",
};

export const tokensLight = {};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            ...tokensDark,
            primary: {
              main: "#1a73e8",
            },
            text: {
              primary: "#000",
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: "#1a73e8",
            },
            text: {
              primary: "#000",
            },
          }),
    },
    typography: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
