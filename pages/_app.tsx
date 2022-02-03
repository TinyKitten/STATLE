import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Modal from "react-modal";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../constants/theme";
import useAnalytics from "../hooks/useAnalytics";
import useAppearance from "../hooks/useAppearance";
import useKeyboardEvent from "../hooks/useKeyboardEvent";
import "../styles/modal.css";

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
Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
  const { appearance, themeReady } = useAppearance();
  const router = useRouter();

  const { recordPV } = useAnalytics();

  useEffect(() => {
    const handleRouteChange = () => {
      recordPV();
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [recordPV, router.events]);

  useKeyboardEvent(true);

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
