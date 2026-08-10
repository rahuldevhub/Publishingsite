"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Monochrome distribution-platform logos.
 *
 * Amazon, Apple, and Flipkart use their real brand marks (path data from
 * Simple Icons, CC0-licensed — https://simpleicons.org — used here in the
 * standard "as seen on" nominative sense, not as an endorsement claim).
 * Google Books, Barnes & Noble, and Kobo have no icon in that library, so
 * they're rendered as clean typographic wordmarks instead — still monochrome
 * shapes, not plain UI text.
 *
 * All logos inherit `currentColor`, so the parent controls the monochrome
 * grey and the hover-to-ink transition. Each is height-normalised via a
 * shared class so the row sits on one visual baseline.
 *
 * Mobile (<sm) gets its own auto-scrolling marquee (see LogoMarquee below);
 * tablet/desktop (sm+) keep the original static, centered wrap layout
 * untouched.
 */

const cls =
  "h-8 w-auto shrink-0 text-gray-700 transition-colors duration-200 hover:text-gray-900";

const wordFont = "'Helvetica Neue', Arial, sans-serif";

function Amazon() {
  return (
    <svg viewBox="0 0 128 30" className={cls} role="img" aria-label="Amazon">
      {/* Real Amazon "smile" mark — Simple Icons, CC0 */}
      <g transform="translate(0,3.2) scale(0.905)">
        <path
          fill="currentColor"
          d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.051-.13zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.912-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.46-.35.27-.575.63-.675 1.096-.06.3-.206.465-.435.51l-2.52-.315c-.248-.06-.372-.18-.372-.39 0-.046.007-.09.022-.15.247-1.29.855-2.25 1.82-2.88.976-.616 2.1-.975 3.39-1.05h.54c1.65 0 2.957.434 3.888 1.29.135.15.27.3.405.48.12.165.224.314.283.45.075.134.15.33.195.57.06.254.105.42.135.51.03.104.062.3.076.615.01.313.02.493.02.553v5.28c0 .376.06.72.165 1.036.105.313.21.54.315.674l.51.674c.09.136.136.256.136.36 0 .12-.06.226-.18.314-1.2 1.05-1.86 1.62-1.963 1.71-.165.135-.375.15-.63.045a6.062 6.062 0 01-.526-.496l-.31-.347a9.391 9.391 0 01-.317-.42l-.3-.435c-.81.886-1.603 1.44-2.4 1.665-.494.15-1.093.227-1.83.227-1.11 0-2.04-.343-2.76-1.034-.72-.69-1.08-1.665-1.08-2.94l-.05-.076zm3.753-.438c0 .566.14 1.02.425 1.364.285.34.675.512 1.155.512.045 0 .106-.007.195-.02.09-.016.134-.023.166-.023.614-.16 1.08-.553 1.424-1.178.165-.28.285-.58.36-.91.09-.32.12-.59.135-.8.015-.195.015-.54.015-1.005v-.54c-.84 0-1.484.06-1.92.18-1.275.36-1.92 1.17-1.92 2.43l-.035-.02zm9.162 7.027c.03-.06.075-.11.132-.17.362-.243.714-.41 1.05-.5a8.094 8.094 0 011.612-.24c.14-.012.28 0 .41.03.65.06 1.05.168 1.172.33.063.09.099.228.099.39v.15c0 .51-.149 1.11-.424 1.8-.278.69-.664 1.248-1.156 1.68-.073.06-.14.09-.197.09-.03 0-.06 0-.09-.012-.09-.044-.107-.12-.064-.24.54-1.26.806-2.143.806-2.64 0-.15-.03-.27-.087-.344-.145-.166-.55-.257-1.224-.257-.243 0-.533.016-.87.046-.363.045-.7.09-1 .135-.09 0-.148-.014-.18-.044-.03-.03-.036-.047-.02-.077 0-.017.006-.03.02-.063v-.06z"
        />
      </g>
      <text
        x="30"
        y="21"
        fontFamily={wordFont}
        fontSize="19"
        fontWeight={600}
        fill="currentColor"
      >
        Amazon
      </text>
    </svg>
  );
}

function AppleBooks() {
  return (
    <svg viewBox="0 0 132 30" className={cls} role="img" aria-label="Apple Books">
      {/* Real Apple mark — Simple Icons, CC0 */}
      <g transform="translate(0,3.2) scale(0.905)">
        <path
          fill="currentColor"
          d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
        />
      </g>
      <text
        x="27"
        y="21"
        fontFamily={wordFont}
        fontSize="19"
        fontWeight={600}
        fill="currentColor"
      >
        Books
      </text>
    </svg>
  );
}

function GoogleBooks() {
  return (
    <svg viewBox="0 0 150 30" className={cls} role="img" aria-label="Google Books">
      <text
        x="0"
        y="21"
        fontFamily={wordFont}
        fontSize="20"
        fontWeight={500}
        letterSpacing="-0.5"
        fill="currentColor"
      >
        Google
      </text>
      <text
        x="74"
        y="21"
        fontFamily={wordFont}
        fontSize="20"
        fontWeight={300}
        letterSpacing="-0.5"
        fill="currentColor"
      >
        Books
      </text>
    </svg>
  );
}

function BarnesNoble() {
  return (
    <svg viewBox="0 0 186 30" className={cls} role="img" aria-label="Barnes & Noble">
      {/* Single text run with tspans so the browser lays out the spacing —
          hand-placed x coordinates were causing the & to collide with the
          wordmarks. Spaces around the italic ampersand give clean gaps. */}
      <text
        x="0"
        y="21"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="18"
        fontWeight={700}
        letterSpacing="0.5"
        fill="currentColor"
      >
        BARNES
        <tspan fontWeight={400} fontStyle="italic" letterSpacing="0">
          {"  &  "}
        </tspan>
        NOBLE
      </text>
    </svg>
  );
}

function Kobo() {
  return (
    <svg viewBox="0 0 62 30" className={cls} role="img" aria-label="Kobo">
      <text
        x="0"
        y="22"
        fontFamily={wordFont}
        fontSize="24"
        fontWeight={700}
        letterSpacing="-0.5"
        fill="currentColor"
      >
        kobo
      </text>
    </svg>
  );
}

function Flipkart() {
  return (
    <svg viewBox="0 0 108 30" className={cls} role="img" aria-label="Flipkart">
      {/* Real Flipkart bag mark — Simple Icons, CC0 */}
      <g transform="translate(1,3.2) scale(0.905)">
        <path
          fill="currentColor"
          d="M3.833 1.333a.993.993 0 0 0-.333.061V1c0-.551.449-1 1-1h14.667c.551 0 1 .449 1 1v.333H3.833zm17.334 2.334H2.833c-.551 0-1 .449-1 1V23c0 .551.449 1 1 1h7.3l1.098-5.645h-2.24c-.051 0-5.158-.241-5.158-.241l4.639-.327-.078-.366-1.978-.285 1.882-.158-.124-.449-3.075-.467s3.341-.373 3.392-.373h3.232l.247-1.331c.289-1.616.945-2.807 1.973-3.693 1.033-.892 2.344-1.332 3.937-1.332.643 0 1.053.151 1.231.463.118.186.201.516.279.859.074.352.14.671.095.903-.057.345-.461.465-1.197.465h-.253c-1.327 0-2.134.763-2.405 2.31l-.243 1.355h1.54c.574 0 .781.402.622 1.306-.17.941-.539 1.36-1.111 1.36H14.9L13.804 24h7.362c.551 0 1-.449 1-1V4.667a1 1 0 0 0-.999-1zM20.5 2.333A.334.334 0 0 0 20.167 2H3.833a.334.334 0 0 0-.333.333V3h17v-.667z"
        />
      </g>
      <text
        x="27"
        y="21"
        fontFamily={wordFont}
        fontSize="19"
        fontWeight={700}
        fontStyle="italic"
        letterSpacing="-0.5"
        fill="currentColor"
      >
        Flipkart
      </text>
    </svg>
  );
}

const LOGOS = [Amazon, GoogleBooks, AppleBooks, BarnesNoble, Kobo, Flipkart];

/** One full pass of the logo set, reused twice for the marquee's seamless loop. */
function LogoRow({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-x-10" aria-hidden={hidden || undefined}>
      {LOGOS.map((Logo, i) => (
        <Logo key={i} />
      ))}
      <span className="shrink-0 whitespace-nowrap pr-2 text-sm font-medium text-gray-400">
        + Many More
      </span>
    </div>
  );
}

/**
 * Mobile-only auto-scrolling marquee: a CSS transform animation (reusing the
 * `hero-ticker` keyframe, see globals.css) drifts the doubled logo track
 * right-to-left, seamlessly looping at -50%. The scroller itself stays a
 * real `overflow-x-auto` element so touch/trackpad drag keeps working
 * natively; a short inactivity timer resumes the animation after the user
 * lets go.
 */
function LogoMarquee() {
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  const hold = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setPaused(true);
  };
  const scheduleResume = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 2400);
  };

  return (
    <div
      className="-mx-6 overflow-x-auto px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      onPointerDown={hold}
      onPointerUp={scheduleResume}
      onPointerCancel={scheduleResume}
      onTouchStart={hold}
      onTouchEnd={scheduleResume}
      onWheel={scheduleResume}
      onScroll={scheduleResume}
    >
      <div
        className="flex w-max items-center gap-x-10 animate-platform-logos-marquee"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        <LogoRow />
        <LogoRow hidden />
      </div>
    </div>
  );
}

export default function PlatformLogos() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* ── Mobile (<sm): auto-scrolling, swipeable marquee ── */}
      <div className="sm:hidden">
        {reduceMotion ? (
          <ul className="-mx-6 flex snap-x snap-proximity items-center gap-x-10 overflow-x-auto scroll-px-6 px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {LOGOS.map((Logo, i) => (
              <li key={i} className="shrink-0 snap-start opacity-95">
                <Logo />
              </li>
            ))}
            <li className="shrink-0 snap-start whitespace-nowrap pr-2 text-sm font-medium text-gray-400">
              + Many More
            </li>
          </ul>
        ) : (
          <LogoMarquee />
        )}
      </div>

      {/* ── Tablet/desktop (sm+): original static, centered wrap layout — unchanged ── */}
      <ul className="hidden items-center sm:flex sm:flex-wrap sm:justify-center sm:gap-x-12 sm:gap-y-7">
        {LOGOS.map((Logo, i) => (
          <li key={i} className="shrink-0 opacity-95 transition-opacity duration-200 ease-out hover:opacity-100">
            <Logo />
          </li>
        ))}
        <li className="shrink-0 whitespace-nowrap text-sm font-medium text-gray-400">+ Many More</li>
      </ul>
    </>
  );
}
