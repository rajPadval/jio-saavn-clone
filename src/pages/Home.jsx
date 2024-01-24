import Navbar from "../components/Navbar";
import MainSection from "../components/MainSection";
import Player from "../components/Player";
import SearchSection from "../components/SearchSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <SearchSection />
      <MainSection />
      <Player />
    </>
  );
}
