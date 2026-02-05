import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import TrendingAuctions from "@/components/home/TrendingAuctions";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 ">
      <Hero />
      <Categories />
      <TrendingAuctions />
    </main>
  );
}