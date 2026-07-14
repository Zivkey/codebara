export default function Home() {
  return (
    <>
      {/* Full black background with a subtle drifting gradient */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
        <div className="bg-aurora bg-aurora--1" />
        <div className="bg-aurora bg-aurora--2" />
      </div>

      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center text-white">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 font-mono text-xs uppercase tracking-widest text-white/50">
          building in progress
        </div>

        <h1 className="mt-8 font-sans text-5xl font-semibold uppercase tracking-[0.06em] text-neutral-50 sm:text-7xl">
          Codebara
        </h1>

        <p className="mt-6 max-w-md text-balance text-base text-white/50">
          A portfolio is being built here. Check back soon.
        </p>

        <footer className="absolute bottom-8 font-mono text-xs text-white/30">
          © {new Date().getFullYear()} Marko Živanović
        </footer>
      </main>
    </>
  );
}
