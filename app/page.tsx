"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";

const PHOTOS = [
  "/photos/1.jpeg",
  "/photos/2.jpeg",
  "/photos/3.jpeg",
  "/photos/4.jpeg",
  "/photos/5.jpeg",
  "/photos/6.jpeg",
  "/photos/7.jpeg",
  "/photos/8.jpeg",
];

export default function Page() {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noTries, setNoTries] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ✅ Copy personal (edit if you want)
  const title = "Liz… ¿Quieres ser mi Valentín?";
  const subtitle = "San Valentín 2026 💗";
  const finalLine = "Entonces Sábado: cena romántica en casa, tú y yo.";

  const photos = useMemo(() => PHOTOS, []);

  useEffect(() => {
    setNoPos({ x: 0, y: 0 });
  }, []);

  const popConfetti = () => {
    const duration = 1200;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 6,
        spread: 55,
        startVelocity: 28,
        scalar: 0.9,
        origin: { x: 0.2 + Math.random() * 0.6, y: 0.65 },
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const moveNoButton = () => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const maxX = Math.max(0, rect.width - 140);
    const maxY = Math.max(0, 140);

    const x = Math.floor((Math.random() - 0.5) * maxX);
    const y = Math.floor((Math.random() - 0.3) * maxY);

    setNoTries((t) => t + 1);
    setNoPos({ x, y });
  };

  const onYes = () => {
    setAccepted(true);
    popConfetti();
  };

  return (
    <main className="min-h-screen bg-[#0b0b12] text-white">
      {/* background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="absolute top-[38%] -left-28 h-[380px] w-[380px] rounded-full bg-rose-500/20 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-120px] h-[520px] w-[520px] rounded-full bg-indigo-500/25 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-md px-5 pb-14 pt-10">
        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
          <div className="px-6 pb-6 pt-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              San Valentín
            </div>

            {!accepted ? (
              <section ref={containerRef} className="relative mt-5">
                <h1 className="text-balance text-3xl font-semibold leading-tight">
                  {title}
                </h1>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-white/75">
                  {subtitle}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={onYes}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-rose-500 to-fuchsia-600 px-4 py-3 text-sm font-semibold shadow-lg shadow-fuchsia-500/20 active:scale-[0.99]"
                  >
                    Sí 💖
                  </button>

                  <button
                    onMouseEnter={moveNoButton}
                    onTouchStart={moveNoButton}
                    onClick={moveNoButton}
                    className="relative rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 active:scale-[0.99]"
                    style={{
                      transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                      transition: "transform 220ms ease",
                    }}
                    aria-label="No"
                  >
                    No 🙃
                  </button>
                </div>

                <p className="mt-4 text-center text-xs text-white/55">
                  {noTries > 0
                    ? `Intentos de “No”: ${noTries} (no se vale 😄)`
                    : "Toca el botón…"}
                </p>
              </section>
            ) : (
              <section className="mt-5 text-center">
                <h2 className="text-3xl font-semibold">¡Sii! 💘</h2>
                <p className="mx-auto mt-3 max-w-sm text-sm text-white/75">
                  {finalLine}
                </p>

                {/* ✅ Personal message */}
                <p className="mt-4 text-sm text-white/75">
                  Amor, gracias por hacer mis días más bonitos. Te amo!
                </p>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
                  <p className="text-sm font-semibold">Propuesta:</p>
                  <ul className="mt-2 space-y-2 text-sm text-white/75">
                    <li>🕯️ Luz tenue + velitas </li>
                    <li>🍝 Cena romántica en casa </li>
                    <li>🍷 Bebida rica </li>
                    <li>🍰 Postre </li>
                    <li>🔥 Masaje en el cuello </li>
                  </ul>
                </div>

                <button
                  onClick={() => popConfetti()}
                  className="mt-6 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90"
                >
                  Más confetti ✨
                </button>
              </section>
            )}
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-white/10" />

          {/* Photos */}
          <div className="px-5 pb-6 pt-5">
            <div className="flex items-end justify-between">
              <p className="text-sm font-semibold">Nosotros</p>
              <p className="text-xs text-white/55">scroll</p>
            </div>

            <div className="mt-4 flex gap-4 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
              {photos.map((src, idx) => (
                <figure
                  key={src}
                  className="min-w-[190px] max-w-[190px] rotate-[-1deg] rounded-2xl border border-white/10 bg-white/5 p-3 shadow-lg shadow-black/30"
                  style={{ transform: `rotate(${idx % 2 === 0 ? -2 : 2}deg)` }}
                >
                  <div className="relative h-[240px] w-full overflow-hidden rounded-xl">
                    <Image
                      src={src}
                      alt={`foto ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="190px"
                      priority={idx < 2}
                    />
                  </div>
                  <figcaption className="mt-2 text-xs text-white/70">
                    {idx === 0 ? "Mi favorita" : "❤️"}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
