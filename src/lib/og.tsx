// ImageResponse (satori) obsługuje tylko zwykłe <img>, next/image tu nie zadziała
/* eslint-disable @next/next/no-img-element */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { THEME_COLOR } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };

const logotype = `data:image/png;base64,${await readFile(
  join(process.cwd(), "public/logos/logotype-white.png"),
  "base64",
)}`;

const logo = `data:image/png;base64,${await readFile(
  join(process.cwd(), "public/logos/logo-white.png"),
  "base64",
)}`;

/** Obrazek do podglądu linku (Discord, Facebook, X, Google). */
export function ogImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: `radial-gradient(90% 120% at 100% 0%, #2a2828 0%, ${THEME_COLOR} 60%)`,
          color: "#ece9e7",
        }}
      >
        {/* logotype-white.png ma proporcje 1193×232 */}
        <img src={logotype} width={247} height={48} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow && (
            <div
              style={{
                fontSize: 26,
                color: "#9a9390",
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {eyebrow}
            </div>
          )}
          <div
            style={{
              marginTop: eyebrow ? 16 : 0,
              fontSize: 76,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#ffffff",
              maxWidth: 900,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                marginTop: 24,
                fontSize: 32,
                color: "#9a9390",
                maxWidth: 900,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#9a9390",
          }}
        >
          <span>evohost.pl</span>
          <span>BLIK · karta · przelew</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}

/** Kwadratowa ikona z logo na ciemnym tle. */
export function iconImage(size: number) {
  const pad = Math.round(size * 0.2);
  const w = size - pad * 2;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: THEME_COLOR,
        }}
      >
        {/* logo-white.png ma proporcje 656×632 */}
        <img src={logo} width={w} height={Math.round((w * 632) / 656)} alt="" />
      </div>
    ),
    { width: size, height: size },
  );
}
