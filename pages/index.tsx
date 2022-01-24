import type { NextPage } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HistoryAndGuess from "../components/HistoryAndGuess";

const Home: NextPage = () => {
  return (
    <main>
      <Header />
      <HistoryAndGuess />
      <Footer />
    </main>
  );
};

export default Home;
