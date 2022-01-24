import type { AppProps } from "next/app";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../constants/theme";
import useAppearance from "../hooks/useAppearance";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.background};
  min-height: 100vh;
`;

function MyApp({ Component, pageProps }: AppProps) {
  const { appearance, themeReady } = useAppearance();

  if (!themeReady) {
    return null;
  }

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={appearance === "dark" ? darkTheme : lightTheme}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
