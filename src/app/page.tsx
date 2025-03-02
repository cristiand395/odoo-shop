import { HomeCarousel } from "./_components/carousel";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid justify-items-center min-h-screen md:min-w-6xl mx-auto">
      <section className="w-full">
        <HomeCarousel />
      </section>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left">
          <li className="font-[family-name:var(--font-geist-sans)]">Font Test</li>
          <li className="var(--font-geist-sans)"> Font Test</li>
          <li className="font-sans"> Font Test</li>
          <li className="font-[family-name:var(--font-geist-mono)]">Font Test</li>
          <li className="var(--font-geist-mono)"> Font Test</li>
          <li className="font-mono"> Font Test</li>
          <li className="mb-2">
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
      </main>
    </div>
  );
}
