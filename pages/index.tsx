import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HistoryAndGuess from "../components/HistoryAndGuess";

const Home: NextPage = () => {
  return (
    <main>
      <Head>
        <title>STATLE</title>
      </Head>
      <Header />
      <HistoryAndGuess />
      <Footer />
    </main>
  );
};

export default Home;
