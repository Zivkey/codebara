import grain from "../../public/grain.png";
import { EmailLink } from "./email-link";
import { PosterPhoto } from "./poster-photo";
import { PosterStatement } from "./poster-statement";
import { Sparkle } from "./sparkle";
import { ThemeSwitcher } from "./theme-switcher";

const EMAIL = "marko@wonder.so";

const links = [
  { name: "Wonder", note: "wonder.design", href: "https://wonder.design" },
  { name: "X", note: "Posts about building with agents", href: "https://x.com/zivkeey" },
  { name: "GitHub", note: "github.com/Zivkey", href: "https://github.com/Zivkey" },
  { name: "LinkedIn", note: "Work history", href: "https://www.linkedin.com/in/marko-zivanovicc/" },
  { name: "Email", note: "Say hi", href: `mailto:${EMAIL}` },
];

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * A label that slides out and lets "Email copied" slide in while the
 * surrounding EmailLink carries `data-copied`. Both sit in one grid cell so
 * the swap never shifts the layout, and the incoming label waits a beat so
 * the two never overlap.
 */
function CopiedSwap({ label, className = "" }: { label: string; className?: string }) {
  const base =
    "col-start-1 row-start-1 whitespace-nowrap transition-[opacity,translate,text-underline-offset] duration-300 ease-out-expo motion-reduce:transition-none";
  return (
    <span className="inline-grid justify-items-end">
      <span
        className={`${base} [transition-delay:120ms,120ms,0ms] group-data-copied:-translate-y-2 group-data-copied:opacity-0 group-data-copied:[transition-delay:0ms] ${className}`}
      >
        {label}
      </span>
      <span
        aria-hidden="true"
        className={`${base} translate-y-2 opacity-0 group-data-copied:translate-y-0 group-data-copied:opacity-100 group-data-copied:[transition-delay:120ms,120ms,0ms] ${className}`}
      >
        Email copied
      </span>
    </span>
  );
}

function WonderMark({
  className,
  // The default box leaves a little air around the mark; pass a tighter one
  // to size the mark by its own edges.
  viewBox = "192 192 640 640",
}: {
  className?: string;
  viewBox?: string;
}) {
  return (
    <svg viewBox={viewBox} fill="none" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M708.058 223.302C743.944 220.738 777.796 234.477 796.666 265.729C818.902 302.557 804.174 348.724 788.66 388.849L767.443 443.723C748.733 501.532 748.733 563.772 767.443 621.581L771.151 633.045C789.066 688.4 768.397 748.943 720.369 781.784C683.63 806.906 635.388 807.472 598.068 783.222C572.143 766.375 545.517 746.707 514.627 745.385C514.092 745.362 513.556 745.346 513.02 745.336L511.5 745.316C510.464 745.322 509.426 745.353 508.391 745.406C477.513 746.988 450.856 766.375 424.932 783.222C387.612 807.472 339.369 806.906 302.631 781.784C254.603 748.943 233.932 688.399 251.846 633.045L255.557 621.581C274.267 563.772 274.267 501.532 255.557 443.723L234.34 388.849C218.826 348.724 204.098 302.557 226.334 265.729C245.204 234.478 279.053 220.739 314.939 223.302C351.577 225.919 382.828 259.787 400.06 286.587L401.114 287.979C408.394 297.582 422.889 297.405 429.931 287.626C447.063 261.183 477.707 242.301 511.5 242.039L513.082 242.064C546.218 242.853 576.205 261.597 593.069 287.626C600.111 297.406 614.606 297.583 621.886 287.979L622.94 286.587C640.172 259.787 671.421 225.919 708.058 223.302ZM431.003 409.919C408.216 409.919 389.742 444.439 389.742 487.024C389.742 529.61 408.216 564.133 431.003 564.133C453.791 564.133 472.265 529.61 472.265 487.024C472.265 444.439 453.791 409.919 431.003 409.919ZM591.991 409.919C569.204 409.92 550.732 444.44 550.732 487.024C550.732 529.609 569.204 564.132 591.991 564.133C614.779 564.133 633.253 529.61 633.253 487.024C633.253 444.439 614.779 409.919 591.991 409.919Z"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col items-center overflow-clip bg-page px-4 pb-24 font-sans text-ink antialiased transition-colors duration-300">
      {/* Floats in the corner, clear of the centered content, while the page scrolls. */}
      <ThemeSwitcher className="fixed right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-50 sm:right-8 sm:bottom-8" />

      <main className="mt-24 flex w-full max-w-[560px] flex-col sm:mt-[120px]">
        <h1 className="text-[44px] leading-none font-semibold tracking-[-0.045em] whitespace-nowrap sm:text-[68px]">
          Marko Zivanovic
        </h1>

        <p className="mt-3.5 flex items-center gap-2 text-[22px] font-semibold tracking-[-0.01em]">
          Building at
          <WonderMark className="size-[26px]" />
          Wonder
        </p>

        <div className="mt-[34px] flex flex-col gap-3.5 text-[19px] leading-[1.55] font-medium">
          <p>I&apos;m a software engineer.</p>
          <p>
            These days I work on Wonder, a canvas for designing and building software with AI
            agents.
          </p>
          <p>The links are below. Say hi.</p>
        </div>

        <ul className="mt-10 flex w-full flex-col border-b border-line">
          {links.map((link) => {
            const external = link.href.startsWith("http");
            const isEmail = link.href.startsWith("mailto:");
            const rowClass =
              "group relative flex w-full items-center justify-between gap-4 py-[13px] outline-none";
            const row = (
              <>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -top-px h-0.5 bg-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
                <span className="relative flex items-center text-[22px] font-semibold tracking-[-0.02em]">
                  <Sparkle className="absolute left-0 size-[22px] scale-50 -rotate-90 opacity-0 transition duration-300 ease-out-expo group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:rotate-0 group-focus-visible:opacity-100" />
                  <span className="transition-transform duration-300 ease-out-expo group-hover:translate-x-8 group-focus-visible:translate-x-8">
                    {link.name}
                  </span>
                </span>
                <span className="flex items-center gap-2.5 text-right text-base font-medium">
                  {isEmail ? (
                    <CopiedSwap label={link.note} />
                  ) : (
                    link.note
                  )}
                  <ArrowUpRight className="size-5 shrink-0 transition-transform duration-300 ease-out-expo group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-focus-visible:translate-x-[3px] group-focus-visible:-translate-y-[3px]" />
                </span>
              </>
            );
            return (
              <li key={link.name} className="border-t border-line">
                {isEmail ? (
                  <EmailLink email={EMAIL} className={rowClass}>
                    {row}
                  </EmailLink>
                ) : (
                  <a
                    href={link.href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className={rowClass}
                  >
                    {row}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </main>

      <section
        aria-label="Currently at Wonder"
        className="poster @container relative mt-24 aspect-[880/1100] w-full max-w-[560px] overflow-clip bg-poster text-page transition-colors duration-500 sm:mt-[180px]"
      >
        <div className="poster-photo absolute inset-x-0 -top-[15%] h-[130%]">
          <PosterPhoto />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-size-[128px_128px] mix-blend-overlay"
          style={{ backgroundImage: `url(${grain.src})` }}
        />

        <div className="relative flex size-full flex-col p-[4.55cqw]">
          {/* Sized and nudged so the mark's top and left edges and the word's
              right edge all sit one poster padding from the poster's edge. */}
          <p className="poster-title -mt-[1.5cqw] mb-auto flex items-center gap-[1.6cqw] text-[21.24cqw] leading-[0.9] font-semibold tracking-[-0.055em] whitespace-nowrap">
            <WonderMark viewBox="215 223 593 578" className="h-[16.32cqw] w-[16.78cqw] shrink-0" />
            Wonder
          </p>

          <PosterStatement className="poster-statement mb-[20cqw] w-[54cqw] text-[3.86cqw] text-balance leading-[1.08] font-semibold tracking-[-0.025em]" />
        </div>
      </section>

      <footer className="mt-7 w-full max-w-[560px] text-[15px] font-medium">
        © {new Date().getFullYear()} Marko Zivanovic
      </footer>
    </div>
  );
}
