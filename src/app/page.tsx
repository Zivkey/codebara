import Image from "next/image";
import grain from "../../public/grain.png";
// The sea photo with its flip, sepia and cobalt shade already baked in.
import seaPoster from "../../public/sea-poster-graded.jpg";
import { EmailLink } from "./email-link";

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

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="8 8 48 48" fill="none" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M32.6 9.5c.9 0 1.2 1.6 1.4 4 .7 8.6 2.4 13.6 6.2 15.6 3.2 1.7 8.4 2.2 14 2.6 1.5.1 1.5 1.5 0 1.7-5.6.6-10.8 1-14 2.6-3.8 2-5.5 7-6.2 15.8-.2 2.4-.6 3.9-1.4 3.9s-1.2-1.5-1.4-3.9c-.7-8.8-2.4-13.8-6.2-15.8-3.2-1.6-8.2-2-13.4-2.6-1.5-.2-1.5-1.6 0-1.7 5.2-.4 10.2-.9 13.4-2.6 3.8-2 5.5-7 6.2-15.6.2-2.4.5-4 1.4-4z"
      />
    </svg>
  );
}

function WonderMark({ className }: { className?: string }) {
  return (
    <svg viewBox="192 192 640 640" fill="none" aria-hidden="true" className={className}>
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
    <div className="relative flex flex-1 flex-col items-center overflow-clip bg-rose px-4 pb-24 font-sans text-azure antialiased">
      <header className="absolute inset-x-6 top-8 flex items-center justify-between sm:inset-x-10">
        <span className="text-[17px] font-semibold tracking-[-0.01em]">Codebara</span>
        <EmailLink
          email={EMAIL}
          className="group text-base font-semibold"
        >
          <CopiedSwap
            label="Say hi"
            className="underline decoration-azure underline-offset-[5px] group-hover:underline-offset-[9px] group-focus-visible:underline-offset-[9px]"
          />
        </EmailLink>
      </header>

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
          <p>I design and build software, usually with a few AI agents working beside me.</p>
          <p>
            Day to day that happens at Wonder, the canvas where designers, engineers and their
            agents work together.
          </p>
          <p>
            Always happy to talk about design, code or agents. The links below are the fastest
            way to reach me.
          </p>
        </div>

        <ul className="mt-10 flex w-full flex-col border-b border-cobalt-line">
          {links.map((link) => {
            const external = link.href.startsWith("http");
            const isEmail = link.href.startsWith("mailto:");
            const rowClass =
              "group relative flex w-full items-center justify-between gap-4 py-[13px] outline-none";
            const row = (
              <>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -top-px h-0.5 bg-azure opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-azure opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
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
              <li key={link.name} className="border-t border-cobalt-line">
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
        className="poster @container relative mt-24 aspect-[880/1100] w-full max-w-[880px] overflow-clip bg-cobalt-deep text-rose sm:mt-[180px]"
      >
        <div className="poster-photo absolute inset-x-0 -top-[15%] h-[130%]">
          <Image
            src={seaPoster}
            alt="The sea seen from a rocky coast, with pink bougainvillea in the foreground"
            fill
            sizes="(min-width: 912px) 880px, 100vw"
            placeholder="blur"
            loading="eager"
            className="object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-size-[128px_128px] mix-blend-overlay"
          style={{ backgroundImage: `url(${grain.src})` }}
        />

        <div className="relative flex size-full flex-col p-[4.55cqw]">
          <div className="flex w-full items-center justify-between">
            <span className="text-[max(12px,1.93cqw)] font-semibold">Marko Zivanovic</span>
            <span className="text-[max(12px,1.82cqw)] font-medium">Currently at</span>
          </div>

          <p className="poster-title mt-[2.05cqw] mb-auto -ml-[0.45cqw] flex items-center gap-[1.59cqw] text-[21.6cqw] leading-[0.9] font-semibold tracking-[-0.055em] whitespace-nowrap">
            <WonderMark className="size-[15.9cqw] shrink-0" />
            Wonder
          </p>

          <p className="poster-statement mb-[20cqw] w-[34.1cqw] text-[3.86cqw] leading-[1.08] font-semibold tracking-[-0.025em]">
            Design and code with your agents on one canvas.
          </p>

          <span className="poster-note absolute top-[51.36cqw] right-[6.36cqw] -rotate-[5deg] font-handwriting text-[5cqw] leading-none whitespace-nowrap">
            my day job
          </span>
        </div>
      </section>

      <footer className="mt-7 w-full max-w-[880px] text-[15px] font-medium">
        © {new Date().getFullYear()} Marko Zivanovic
      </footer>
    </div>
  );
}
