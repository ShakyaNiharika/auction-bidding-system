import Hero from "@/components/home/Hero";
import SugarcaneVarieties from "@/components/home/SugarcaneVarieties";
import TrendingAuctions from "@/components/home/TrendingAuctions";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 ">
      <Hero />
      <SugarcaneVarieties />
      <TrendingAuctions />
    </main>
  );
}