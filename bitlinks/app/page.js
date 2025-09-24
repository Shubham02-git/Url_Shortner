import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";


const poppins = localFont({
  src: "./fonts/Poppins-ExtraBold.ttf",
  variable: "--font-poppins",
  weight: "100 900",
});

export default function Home() {
  return (
    <main className="bg-purple-100">
      <section className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[60vh]">
        <div className="flex flex-col gap-6 items-center md:items-start justify-center px-6 md:px-0">
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${poppins.className} text-center md:text-left mx-10`}>The best URL shortener in the market</h1>

          <p className="max-w-xl mx-10 text-base text-center md:text-left text-gray-700">
            A privacy-first, no-friction URL shortener. No tracking, no forced signups — just fast, reliable short links you control. Share smarter and keep your data private.
          </p>

          <div className="flex flex-wrap gap-3 justify-center w-full">
            <Link href="/shorten" className="inline-flex items-center px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition">
              Try now
            </Link>

            <Link href="/github" className="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-purple-200 text-purple-700 font-semibold shadow hover:shadow-md transition">
              GitHub
            </Link>
          </div>
        </div>

        <div className="relative w-full h-64 md:h-full flex items-center justify-center">
          <Image
            className="object-contain mix-blend-darken"
            alt="Illustration"
            src={"/vector.jpg"}
            fill={true}
            sizes="(max-width: 768px) 80vw, 50vw"
          />
        </div>

      </section>
    </main>
  );
}