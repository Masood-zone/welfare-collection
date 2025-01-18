import { Banner } from "./banner";
import Welfare from "./welfare";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        {/* Banner */}
        <Banner />
        {/* Welfare Programs */}
        <Welfare />
      </main>
    </div>
  );
}
