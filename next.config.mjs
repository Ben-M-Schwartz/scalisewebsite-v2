/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
//import { withAxiom } from "next-axiom";
import { createSecureHeaders } from "next-secure-headers";
//import pkg from "webpack-subresource-integrity";
//const { SubresourceIntegrityPlugin } = pkg;
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  async headers() {
    if (process.env.NODE_ENV === "development") return [];
    return [
      {
        source: "/:path*",
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: ["'self'", "https://clerk.scalise.band"],
              styleSrc: ["'self'", "'unsafe-inline'"],
              imgSrc: [
                "'self'",
                "https://img.clerk.com",
                "https://www.gravatar.com",
              ],
              baseUri: "'self'",
              formAction: "'self'",
              frameSrc: [
                "https://editor.unlayer.com",
                "https://clerk.scalise.band",
                "https://www.youtube.com",
              ],
              scriptSrc: [
                "'self'",
                "https://editor.unlayer.com/embed.js",
                "https://clerk.scalise.band",
              ],
              workerSrc: "blob: 'self'",
              connectSrc: [
                "'self'",
                "https://clerk.scalise.band",
                "https://vitals.vercel-insights.com",
              ],
              //eslint-disable-next-line
              //@ts-ignore
              frameAncestors: true,
            },
          },
          frameGuard: "deny",
          noopen: "noopen",
          nosniff: "nosniff",
          xssProtection: "sanitize",
          forceHTTPSRedirect: [
            true,
            { maxAge: 60 * 60 * 24 * 360, includeSubDomains: true },
          ],
          referrerPolicy: "same-origin",
        }),
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/store",
        destination: "/Store",
      },
      {
        source: "/shows",
        destination: "/Shows",
      },
      {
        source: "/videos",
        destination: "/Videos",
      },
      {
        source: "/music",
        destination: "/Music",
      },
      {
        source: "/contact",
        destination: "/Contact",
      },
      {
        source: "/home",
        destination: "/",
      },
      {
        source: "/landing",
        destination: "/",
      },
    ];
  },
  /*   experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mysql2"],
  }, */
  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default config;
