/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
import { withAxiom } from "next-axiom";
import { createSecureHeaders } from "next-secure-headers";
//import pkg from "webpack-subresource-integrity";
//const { SubresourceIntegrityPlugin } = pkg;
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = withAxiom({
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

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: ["'self'"],
              styleSrc: ["'self'", "'unsafe-inline'"],
              imgSrc: ["'self'"],
              baseUri: "self",
              formAction: "self",
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
});

export default config;
