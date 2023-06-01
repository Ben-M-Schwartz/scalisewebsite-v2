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
  /*   webpack(config) {
    config.output.crossOriginLoading = "anonymous";
    config.plugins.push(
      new SubresourceIntegrityPlugin({
        hashFuncNames: ["sha256", "sha384"],
        enabled: true,
      })
    );

    return config;
  }, */

  reactStrictMode: true,

  // async headers() {
  //   return [
  //     {
  //       source: "/:path*",
  //       headers: createSecureHeaders({
  //         contentSecurityPolicy: {
  //           directives: {
  //             defaultSrc: ["'self'"],
  //             styleSrc: ["'self'", "'unsafe-inline'"],
  //             imgSrc: [
  //               "'self'",
  //               "https://www.gravatar.com/avatar",
  //               "https://www.gravatar.com/*",
  //             ],
  //             baseUri: "'self'",
  //             formAction: "'self'",
  //             frameSrc: [
  //               "https://editor.unlayer.com/1.5.8/editor.html",
  //               "https://clerk.scalise.band/v1/dev_browser/init",
  //               "https://www.youtube.com/embed/I5gtiSsExDA",
  //               "https://www.youtube.com/embed/8dCrG2TTlF4",
  //               "https://www.youtube.com/embed/Do7MAZ_EMUI",
  //               "https://www.youtube.com/embed/GVAwb-u9Xkk",
  //               "https://www.youtube.com/embed/jXnpekrt3y0",
  //               "https://www.youtube.com/embed/gHX7W-cWr2U",
  //               "https://www.youtube.com/embed/zVqXWE4Y6c4",
  //               "https://www.youtube.com/embed/kCOOUUlcss8",
  //               "https://www.youtube.com/embed/1NB1fkEZxRk",
  //               "https://www.youtube.com/embed/4MYu-auxBuM",
  //               "https://www.youtube.com/embed/6B3uocHyZu4",
  //               "https://www.youtube.com/embed/BL1OxvKVllk",
  //             ],
  //             scriptSrc: [
  //               "'self'",
  //               "https://editor.unlayer.com/embed.js",
  //               "https://clerk.scalise.band/npm/@clerk/clerk-js@4/dist/clerk.browser.js",
  //               "https://clerk.scalise.band/npm/@clerk/clerk-js@4.40.1/dist/vendors_f3b780_4.40.1.js",
  //               "https://clerk.scalise.band/npm/@clerk/clerk-js@4.40.1/dist/ui-common_f3b780_4.40.1.js",
  //               "https://clerk.scalise.band/npm/@clerk/clerk-js@4.40.1/dist/signin_f3b780_4.40.1.js",
  //             ],
  //             workerSrc: "blob: https://scalisewebsite-v2.vercel.app/",
  //             connectSrc: [
  //               "'self'",
  //               "https://clerk.scalise.band/v1/environment",
  //               "https://clerk.scalise.band/v1/client",
  //               "https://clerk.scalise.band/v1/client/sign_ins",
  //               "https://clerk.scalise.band/v1/client/sign_ins/sia_2PtlzGWUDJloICYL3qJ9QaDeOA2/attempt_first_factor",
  //               "https://clerk.scalise.band/v1/client/sessions/sess_2PtpRBDNYnWSYIn9OBJMMTWRazk/touch",
  //               "https://clerk.scalise.band/v1/client/sessions/sess_2PtpRBDNYnWSYIn9OBJMMTWRazk/tokens",
  //               "https://vitals.vercel-insights.com/v1/vitals",
  //             ],
  //             //eslint-disable-next-line
  //             //@ts-ignore
  //             frameAncestors: true,
  //           },
  //         },
  //         frameGuard: "deny",
  //         noopen: "noopen",
  //         nosniff: "nosniff",
  //         xssProtection: "sanitize",
  //         forceHTTPSRedirect: [
  //           true,
  //           { maxAge: 60 * 60 * 24 * 360, includeSubDomains: true },
  //         ],
  //         referrerPolicy: "same-origin",
  //       }),
  //     },
  //   ];
  // },

  async rewrites() {
    return [
      {
        source: "/store",
        destination: "/Store",
      },
      {
        source: "/show",
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
};

export default config;
