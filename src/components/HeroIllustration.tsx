import React from 'react';

export function HeroIllustration() {
  return (
    <div className="relative w-full max-w-[480px] lg:max-w-[540px] mx-auto select-none">
      {/* Decorative Cursive Callout Sticker */}
      <div className="absolute -top-3 right-0 sm:right-4 z-20 transform rotate-6 pointer-events-none hidden sm:block">
        <div className="relative">
          <svg className="w-40 h-20 overflow-visible" viewBox="0 0 160 80" fill="none">
            {/* Curved Path */}
            <path
              d="M 140 15 C 100 5, 40 30, 20 65"
              stroke="#2563eb"
              strokeWidth="2"
              strokeDasharray="4 3"
              fill="none"
              strokeLinecap="round"
            />
            {/* Arrow Head */}
            <path d="M 20 65 L 18 53 M 20 65 L 32 63" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div className="absolute top-0 right-2 font-handwriting text-blue-900 dark:text-blue-200 text-sm font-bold tracking-tight rotate-[-4deg] drop-shadow-xs bg-white/90 dark:bg-zinc-900/90 px-2.5 py-1 rounded-lg border border-blue-200/80 dark:border-blue-800/80 shadow-xs">
            <span className="block text-blue-600 dark:text-blue-400 font-black text-xs uppercase tracking-wider">Make Life</span>
            <span className="italic text-zinc-900 dark:text-zinc-100 font-serif text-base">Easier in the USA</span>
          </div>
        </div>
      </div>

      {/* SVG Vector Artwork of Statue of Liberty, NYC Skyline, and US Flag */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-sky-100/70 via-blue-50/40 to-transparent dark:from-sky-950/40 dark:via-zinc-900/40 dark:to-transparent p-2 sm:p-4">
        <svg
          viewBox="0 0 500 420"
          className="w-full h-auto drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="skyGrad" x1="250" y1="0" x2="250" y2="420" gradientUnits="userSpaceOnUse">
              <stop stopColor="#bae6fd" stopOpacity="0.45" />
              <stop offset="0.6" stopColor="#e0f2fe" stopOpacity="0.2" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="skylineGrad1" x1="0" y1="180" x2="0" y2="380" gradientUnits="userSpaceOnUse">
              <stop stopColor="#93c5fd" stopOpacity="0.8" />
              <stop offset="1" stopColor="#60a5fa" stopOpacity="0.3" />
            </linearGradient>

            <linearGradient id="skylineGrad2" x1="0" y1="200" x2="0" y2="380" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60a5fa" stopOpacity="0.9" />
              <stop offset="1" stopColor="#3b82f6" stopOpacity="0.4" />
            </linearGradient>

            <linearGradient id="libertyGrad" x1="330" y1="20" x2="390" y2="380" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="0.4" stopColor="#0284c7" />
              <stop offset="1" stopColor="#0369a1" />
            </linearGradient>

            <linearGradient id="torchGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Sky Arch & Sun Halo */}
          <circle cx="280" cy="180" r="160" fill="url(#skyGrad)" />
          <circle cx="342" cy="55" r="30" fill="#fef08a" fillOpacity="0.35" filter="url(#softGlow)" />

          {/* Clouds */}
          <g opacity="0.8">
            <path
              d="M60 210 Q75 190 100 195 Q125 180 145 200 Q160 215 150 230 L50 230 Z"
              fill="#ffffff"
              fillOpacity="0.85"
            />
            <path
              d="M170 140 Q185 125 205 130 Q225 118 240 132 Q255 145 245 160 L160 160 Z"
              fill="#ffffff"
              fillOpacity="0.9"
            />
          </g>

          {/* NYC Skyline Silhouettes (Layer 1 - Background) */}
          <g fill="url(#skylineGrad1)">
            {/* Left buildings */}
            <rect x="30" y="240" width="32" height="150" rx="2" />
            <rect x="70" y="210" width="40" height="180" rx="3" />
            {/* Spire */}
            <polygon points="90,165 87,210 93,210" />
            <rect x="118" y="230" width="28" height="160" rx="2" />
            <rect x="152" y="195" width="44" height="195" rx="3" />
            {/* Chrysler style spire */}
            <polygon points="174,150 170,195 178,195" />
            <rect x="202" y="220" width="36" height="170" rx="2" />
            <rect x="244" y="180" width="42" height="210" rx="3" />
            <polygon points="265,130 262,180 268,180" />
            <rect x="292" y="215" width="35" height="175" rx="2" />
            <rect x="420" y="230" width="45" height="160" rx="3" />
          </g>

          {/* Layer 2 - Midground Skyline with Windows */}
          <g fill="url(#skylineGrad2)">
            <rect x="52" y="260" width="36" height="130" rx="2" />
            <rect x="98" y="245" width="38" height="145" rx="2" />
            {/* Windows dots */}
            <g fill="#ffffff" fillOpacity="0.45">
              <circle cx="107" cy="265" r="1.5" />
              <circle cx="117" cy="265" r="1.5" />
              <circle cx="127" cy="265" r="1.5" />
              <circle cx="107" cy="285" r="1.5" />
              <circle cx="117" cy="285" r="1.5" />
              <circle cx="127" cy="285" r="1.5" />
              <circle cx="107" cy="305" r="1.5" />
              <circle cx="117" cy="305" r="1.5" />
              <circle cx="127" cy="305" r="1.5" />
            </g>
            <rect x="142" y="240" width="34" height="150" rx="2" />
            <rect x="182" y="250" width="30" height="140" rx="2" />
            <rect x="218" y="235" width="44" height="155" rx="2" />
            <rect x="268" y="250" width="38" height="140" rx="2" />
          </g>

          {/* Statue of Liberty (Stylized Silhouette & Vector) */}
          <g id="StatueOfLiberty">
            {/* Pedestal Base */}
            <path
              d="M310 395 L400 395 L392 340 L318 340 Z"
              fill="#0369a1"
            />
            <rect x="325" y="325" width="60" height="15" fill="#0284c7" rx="1" />
            <rect x="330" y="310" width="50" height="15" fill="#0369a1" rx="1" />

            {/* Liberty Gown / Body */}
            <path
              d="M332 310 L340 180 Q355 170 370 180 L382 310 Q358 315 332 310 Z"
              fill="url(#libertyGrad)"
            />

            {/* Robe Drapery Folds */}
            <path
              d="M344 205 Q355 240 350 305 M358 195 Q365 245 368 308 M372 210 Q378 250 376 305"
              stroke="#075985"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Left Arm holding Tablet */}
            <path
              d="M342 190 L322 220 L332 235 L346 205 Z"
              fill="#0284c7"
            />
            {/* Tablet of Law (JULY IV MDCCLXXVI) */}
            <rect
              x="315"
              y="208"
              width="15"
              height="24"
              rx="2"
              fill="#e0f2fe"
              stroke="#0369a1"
              strokeWidth="1.5"
              transform="rotate(15 315 208)"
            />

            {/* Right Arm raised with Torch */}
            <path
              d="M368 180 L386 110 L398 114 L378 190 Z"
              fill="#0284c7"
            />
            {/* Hand & Torch Handle */}
            <rect x="382" y="80" width="8" height="30" fill="#0369a1" rx="1" transform="rotate(-5 382 80)" />
            <polygon points="378,82 396,82 392,90 382,90" fill="#0284c7" />

            {/* Golden Flame / Torch Glow */}
            <path
              d="M386 80 Q382 65 387 50 Q394 65 389 74 Q394 70 392 80 Z"
              fill="url(#torchGlow)"
              filter="url(#softGlow)"
            />
            <circle cx="388" cy="62" r="14" fill="#fde047" fillOpacity="0.4" />

            {/* Neck and Head */}
            <rect x="352" y="155" width="12" height="15" fill="#0284c7" rx="2" />
            <ellipse cx="358" cy="145" rx="10" ry="12" fill="#38bdf8" />

            {/* Crown with 7 Rays */}
            <path
              d="M346 138 Q358 132 370 138 L368 144 Q358 140 348 144 Z"
              fill="#0284c7"
            />
            {/* Crown Rays */}
            <g stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round">
              <line x1="346" y1="138" x2="336" y2="130" />
              <line x1="350" y1="135" x2="344" y2="124" />
              <line x1="354" y1="133" x2="352" y2="120" />
              <line x1="358" y1="132" x2="358" y2="118" />
              <line x1="362" y1="133" x2="365" y2="120" />
              <line x1="366" y1="135" x2="372" y2="124" />
              <line x1="370" y1="138" x2="380" y2="130" />
            </g>
          </g>

          {/* Waving American Flag in Foreground */}
          <g id="AmericanFlag" transform="translate(340, 190)">
            {/* Flag Pole */}
            <rect x="0" y="0" width="5" height="190" fill="#94a3b8" rx="2" />
            <circle cx="2.5" cy="0" r="5" fill="#eab308" />

            {/* Flag cloth with wave distortion */}
            <g transform="translate(5, 5)">
              {/* Red and White Stripes */}
              <clipPath id="flagWaveClip">
                <path d="M0,0 C35,-6 65,6 115,-3 C125,-5 130,-4 130,-4 L130,78 C130,78 105,73 70,82 C35,90 10,76 0,78 Z" />
              </clipPath>

              <g clipPath="url(#flagWaveClip)">
                {/* 13 Stripes */}
                <rect x="0" y="0" width="135" height="6.5" fill="#ef4444" />
                <rect x="0" y="6.5" width="135" height="6.5" fill="#ffffff" />
                <rect x="0" y="13" width="135" height="6.5" fill="#ef4444" />
                <rect x="0" y="19.5" width="135" height="6.5" fill="#ffffff" />
                <rect x="0" y="26" width="135" height="6.5" fill="#ef4444" />
                <rect x="0" y="32.5" width="135" height="6.5" fill="#ffffff" />
                <rect x="0" y="39" width="135" height="6.5" fill="#ef4444" />
                <rect x="0" y="45.5" width="135" height="6.5" fill="#ffffff" />
                <rect x="0" y="52" width="135" height="6.5" fill="#ef4444" />
                <rect x="0" y="58.5" width="135" height="6.5" fill="#ffffff" />
                <rect x="0" y="65" width="135" height="6.5" fill="#ef4444" />
                <rect x="0" y="71.5" width="135" height="6.5" fill="#ffffff" />
                <rect x="0" y="78" width="135" height="6.5" fill="#ef4444" />

                {/* Blue Canton with Stars */}
                <rect x="0" y="0" width="60" height="42" fill="#1e3a8a" />
                {/* Stars Grid */}
                <g fill="#ffffff">
                  <circle cx="10" cy="7" r="1.8" />
                  <circle cx="22" cy="7" r="1.8" />
                  <circle cx="34" cy="7" r="1.8" />
                  <circle cx="46" cy="7" r="1.8" />

                  <circle cx="16" cy="14" r="1.8" />
                  <circle cx="28" cy="14" r="1.8" />
                  <circle cx="40" cy="14" r="1.8" />
                  <circle cx="52" cy="14" r="1.8" />

                  <circle cx="10" cy="21" r="1.8" />
                  <circle cx="22" cy="21" r="1.8" />
                  <circle cx="34" cy="21" r="1.8" />
                  <circle cx="46" cy="21" r="1.8" />

                  <circle cx="16" cy="28" r="1.8" />
                  <circle cx="28" cy="28" r="1.8" />
                  <circle cx="40" cy="28" r="1.8" />
                  <circle cx="52" cy="28" r="1.8" />

                  <circle cx="10" cy="35" r="1.8" />
                  <circle cx="22" cy="35" r="1.8" />
                  <circle cx="34" cy="35" r="1.8" />
                  <circle cx="46" cy="35" r="1.8" />
                </g>

                {/* Soft Wave Ripple Shadows */}
                <path
                  d="M0,0 C35,-6 65,6 115,-3 L130,78 C105,73 70,82 0,78 Z"
                  fill="url(#skylineGrad1)"
                  opacity="0.15"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
